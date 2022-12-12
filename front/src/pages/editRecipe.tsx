import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useCreateRecipe from '../hooks/Recipe/useCreateRecipe';
import { useRecipeDetail } from '../hooks/Recipe/useRecipes';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeForm from '../components/recipeForm/RecipeForm';
import { RecipeFormDefaultValue } from '../types/recipe/recipeFormType';
import Auth from '../hoc/Auth';

const EditRecipe = () => {
  const { recipeId } = useParams();
  const { data: recipeDetail } = useRecipeDetail(recipeId!);
  const {
    name,
    serving,
    cookingTime,
    category,
    method,
    largeThumbnailUrl,
    ingredient,
    Steps,
  } = recipeDetail!;
  const instructions = Steps.reduce<
    { description?: string; preview?: string }[]
  >((acc, cur) => {
    return [
      ...acc,
      {
        description: cur.content,
        preview: cur.imageUrl,
      },
    ];
  }, []);

  const methods = useForm<RecipeFormDefaultValue>({
    mode: 'onChange',
    defaultValues: {
      name: name,
      mainImage: { preview: largeThumbnailUrl },
      serving: String(serving),
      cookingTime: String(cookingTime),
      category: category,
      method: method,
      ingredients: JSON.parse(ingredient),
      instructions: instructions,
    },
  });
  const { formState } = methods;
  const { mutate: createRecipe } = useCreateRecipe(formState);

  return (
    <Auth>
      <BasePageComponent>
        <FormProvider {...methods}>
          <RecipeFormContainer>
            <RecipeForm onSubmit={createRecipe} />
          </RecipeFormContainer>
        </FormProvider>
      </BasePageComponent>
    </Auth>
  );
};

export default EditRecipe;

const RecipeFormContainer = styled.article`
  width: 110rem;
  margin: auto;
`;
