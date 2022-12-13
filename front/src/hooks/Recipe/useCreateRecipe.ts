import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { FormState } from 'react-hook-form';
import useSetAlert from '../useSetAlert';
import imageResize from '../../util/imageResize';
import { createRecipeRequest } from '../../api/recipeFetcher';
import {
  RecipeFormDefaultValue,
  Step,
} from '../../types/recipe/recipeFormType';
import { FORM_FIELDS } from '../../constants/recipeForm';

const useCreateRecipe = (formState: FormState<RecipeFormDefaultValue>) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const { errors, submitCount } = formState;
  useEffect(() => {
    if (errors) {
      const field = FORM_FIELDS.find((field) => errors[field]);
      if (field === 'mainImage') {
        setAlertError({ error: errors.mainImage?.files?.message });
      } else if (field === 'ingredients') {
        setAlertError({ error: '재료를 입력해주세요.' });
      } else if (field === 'instructions') {
        if (errors && errors.instructions) {
          setAlertError({
            error: '요리순서를 사진과 함께 작성해주세요.',
          });
        }
      } else if (field) {
        setAlertError({ error: errors[field]?.message });
      }
    }
  }, [submitCount]);

  const createRecipe = async (data: RecipeFormDefaultValue) => {
    const {
      name,
      mainImage,
      serving,
      cookingTime,
      category,
      method,
      ingredients,
      instructions,
    } = data;
    const stepImages = Array<File>();
    const steps = Array<Step>();
    const recipeThumbnail = await imageResize(mainImage.files[0]);
    await Promise.all(
      instructions.map(async (instruction, index) => {
        const { description, image } = instruction;
        const compressedImage = await imageResize(image[0]);
        compressedImage && stepImages.push(compressedImage);
        const step: Step = {};
        step.step = index + 1;
        step.content = description;
        steps.push(step);
      }),
    );
    const formData = new FormData();
    formData.append('name', name);
    formData.append('method', method);
    formData.append('category', category);
    formData.append('ingredient', JSON.stringify(ingredients));
    formData.append('serving', serving);
    formData.append('cookingTime', cookingTime);
    formData.append('recipeThumbnail', recipeThumbnail);
    stepImages.forEach((stepImage) => {
      formData.append('stepImages', stepImage);
    });
    formData.append('steps', JSON.stringify(steps));
    return await createRecipeRequest(formData);
  };

  const createRecipeMutation = useMutation(createRecipe, {
    onSuccess: (data) => {
      const { message, result } = data;
      const { dish_id } = result.recipeInformation;
      setAlertSuccess({ success: message });
      queryClient.invalidateQueries('photos');
      const recipeDetailPagePath = `/recipe/detail/${dish_id}`;
      navigate(recipeDetailPagePath, { replace: true });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setAlertError({ error: error.message });
      } else {
        throw error;
      }
    },
  });

  return createRecipeMutation;
};

export default useCreateRecipe;
