import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import useCreateRecipe from '../hooks/useCreateRecipe';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeForm from '../components/recipeForm/RecipeForm';
import { RecipeFormDefaultValue } from '../types/recipe/recipeFormType';

const EditRecipe = () => {
  const methods = useForm<RecipeFormDefaultValue>({
    mode: 'onChange',
    defaultValues: {
      name: '소고기 미역국',
      serving: '1인분',
      cookingTime: '30분',
      category: '국&찌개',
      method: '끓이기',
      ingredients: [
        { name: '돼지고기', amount: '300g' },
        { name: '양배추', amount: '1/2개' },
        { name: '참기름', amount: '2t' },
      ],
      instructions: [{ description: '' }],
    },
  });
  const { mutate: createRecipe } = useCreateRecipe();

  return (
    <BasePageComponent>
      <FormProvider {...methods}>
        <RecipeFormContainer>
          <RecipeForm onSubmit={createRecipe} />
        </RecipeFormContainer>
      </FormProvider>
    </BasePageComponent>
  );
};

export default EditRecipe;

const RecipeFormContainer = styled.article`
  width: 110rem;
  margin: auto;
`;
