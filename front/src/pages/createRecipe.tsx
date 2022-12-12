import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import useCreateRecipe from '../hooks/Recipe/useCreateRecipe';
import Auth from '../hoc/Auth';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeForm from '../components/recipeForm/RecipeForm';
import { RecipeFormDefaultValue } from '../types/recipe/recipeFormType';

const CreateRecipe = () => {
  const methods = useForm<RecipeFormDefaultValue>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      serving: '',
      cookingTime: '',
      category: '',
      method: '',
      ingredients: [
        { name: '', amount: '' },
        { name: '', amount: '' },
        { name: '', amount: '' },
      ],
      instructions: [{ description: '' }],
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

export default CreateRecipe;

const RecipeFormContainer = styled.article`
  width: 110rem;
  margin: auto;
`;
