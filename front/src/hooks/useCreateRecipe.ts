import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { FormState } from 'react-hook-form';
import useSetAlert from './useSetAlert';
import imageResize from '../util/imageResize';
import { createRecipeRequest } from '../api/recipeFetcher';
import { RecipeFormDefaultValue } from '../types/recipe/recipeFormType';
import { FORM_FIELDS } from '../constants/recipeForm';

const useCreateRecipe = (formState: FormState<RecipeFormDefaultValue>) => {
  const navigate = useNavigate();
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
        setAlertError({ error: '요리순서를 작성해주세요' });
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
    const recipeThumbnail = await imageResize(mainImage.files[0]);
    const steps = await instructions.reduce(async (acc, cur, idx) => {
      const { description, image } = cur;
      const compressedImage = await imageResize(image[0]);
      compressedImage && stepImages.push(compressedImage);
      stepImages.push(image[0]);
      return { ...acc, [idx + 1]: description };
    }, {});
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
      const { message } = data;
      setAlertSuccess({ success: message });
      navigate('/collectRecipes');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setAlertError({ error: error.message });
      } else {
        setAlertError({ error: 'request error' });
      }
    },
  });

  return createRecipeMutation;
};

export default useCreateRecipe;
