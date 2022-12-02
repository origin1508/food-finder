import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import BasePageComponent from '../hoc/BasePageComponent';
import CreateRecipeForm from '../components/createRecipe/CreateRecipeForm';
import { CreateRecipeValue } from '../types/recipe/createRecipeType';

const CreateRecipe = () => {
  const methods = useForm<CreateRecipeValue>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      mainImg: new File([], ''),
      category: '',
      cookingMethod: '',
      ingredients: [
        { name: '', amount: '' },
        { name: '', amount: '' },
        { name: '', amount: '' },
      ],
      instructions: [{ step: 1, description: '', image: new File([], '') }],
    },
  });

  return (
    <BasePageComponent>
      <FormProvider {...methods}>
        <CreateRecipeContainer>
          <CreateRecipeForm />
        </CreateRecipeContainer>
      </FormProvider>
    </BasePageComponent>
  );
};

export default CreateRecipe;

const CreateRecipeContainer = styled.article`
  width: 110rem;
  margin: auto;
`;
