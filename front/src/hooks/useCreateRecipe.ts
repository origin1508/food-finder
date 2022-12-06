import { useMutation } from 'react-query';
import useSetAlert from './useSetAlert';
import imageResize from '../util/imageResize';
import { createRecipeRequest } from '../api/recipeFetcher';
import { CreateRecipeValue } from '../types/recipe/createRecipeType';

const useCreateRecipe = () => {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const createRecipe = async (data: CreateRecipeValue) => {
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
    const ingredient = 'test';
    const stepImages = Array<Blob>();
    const recipeThumbnail = await imageResize(mainImage[0]);
    const steps = await instructions.reduce(async (acc, cur, idx) => {
      const { description, image } = cur;
      const compressedImage = await imageResize(image[0]);
      compressedImage && stepImages.push(compressedImage);
      return { ...acc, [idx + 1]: description };
    }, {});

    const formData = new FormData();
    formData.append('name', name);
    formData.append('method', method);
    formData.append('category', category);
    formData.append('ingredient', ingredient);
    formData.append('serving', serving);
    formData.append('cookingTime', cookingTime);
    formData.append('recipeThumnail', recipeThumbnail);
    stepImages.forEach((stepImage) => {
      formData.append('stepImages', stepImage);
    });
    formData.append('steps', JSON.stringify(steps));

    return await createRecipeRequest(formData);
  };

  const mutation = useMutation(createRecipe, {
    onSuccess: (data) => {
      console.log(data);
      setAlertSuccess({ success: '성공' });
    },
    onError: (error) => {
      if (error instanceof Error) {
        setAlertError({ error: error.message });
      } else {
        setAlertError({ error: 'request error' });
      }
    },
  });

  return mutation;
};

export default useCreateRecipe;
