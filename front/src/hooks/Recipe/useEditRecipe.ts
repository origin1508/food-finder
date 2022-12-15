import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { FormState } from 'react-hook-form';
import { AxiosError } from 'axios';
import useSetAlert from '../useSetAlert';
import imageResize from '../../util/imageResize';
import {
  recipeDeleteRequest,
  recipeUpdateRequest,
} from '../../api/recipeFetcher';
import {
  RecipeFormDefaultValue,
  Step,
} from '../../types/recipe/recipeFormType';
import { FORM_FIELDS } from '../../constants/recipeForm';

const useEditRecipe = (
  recipeId?: string,
  formState?: FormState<RecipeFormDefaultValue>,
) => {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const errors = formState?.errors;
  const submitCount = formState?.submitCount;
  useEffect(() => {
    if (errors) {
      const field = FORM_FIELDS.find((field) => errors[field]);
      if (field === 'ingredients') {
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

  const recipeDeleteMutation = useMutation(recipeDeleteRequest, {
    onSuccess: (data) => {
      const { message } = data;
      queryClient.invalidateQueries('authRecips');
      queryClient.invalidateQueries('collectRecipesInfo');
      setAlertSuccess({ success: message });
      navigate('/collectRecipes', { replace: true });
    },
    onError: (error) => {
      if (error && error instanceof AxiosError) {
        setAlertError({ error: error.message });
      } else {
        setAlertError({ error: 'request Error' });
      }
    },
  });

  const editRecipe = async (data: RecipeFormDefaultValue) => {
    if (!recipeId) return;
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

    const formData = new FormData();
    const stepImages = Array<File>();
    const steps = Array<Step>();
    formData.append('name', name);
    if (mainImage.files[0]) {
      const recipeThumbnail = await imageResize(mainImage.files[0]);
      formData.append('recipeThumbnail', recipeThumbnail);
    }
    await Promise.all(
      instructions.map(async (instruction, index) => {
        const { description, image, preview } = instruction;
        const temp = <Step>{};
        temp.step = index + 1;
        temp.content = description;
        if (image && image.length > 0) {
          const compressedImage = await imageResize(image[0]);
          stepImages.push(compressedImage);
        } else {
          temp.imageUrl = preview;
        }
        steps.push(temp);
      }),
    );
    steps.sort((a, b) => {
      return a.step - b.step;
    });
    formData.append('steps', JSON.stringify(steps));
    formData.append('method', method);
    formData.append('category', category);
    formData.append('ingredient', JSON.stringify(ingredients));
    formData.append('serving', serving);
    formData.append('cookingTime', cookingTime);
    stepImages.forEach((stepImage) => {
      formData.append('stepImages', stepImage, stepImage.name);
    });
    return await recipeUpdateRequest(recipeId, formData);
  };

  const recipeUpdateMutation = useMutation(editRecipe, {
    onSuccess: (data) => {
      const { message } = data;
      setAlertSuccess({ success: message });
      queryClient.invalidateQueries(['racipeDetail', recipeId]);
      navigate(`/recipe/detail/${recipeId}`, { replace: true });
    },
    onError: (error) => {
      if (error && error instanceof AxiosError) {
        setAlertError({ error: error.message });
      } else {
        console.log(error);
      }
    },
  });

  return { recipeDeleteMutation, recipeUpdateMutation };
};

export default useEditRecipe;
