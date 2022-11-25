import styled from 'styled-components';
import BasePageComponent from '../hoc/BasePageComponent';
import CreateRecipeForm from '../components/createRecipe/CreateRecipeForm';

const CreateRecipe = () => {
  return (
    <BasePageComponent>
      <CreateRecipeContainer>
        <CreateRecipeForm />
      </CreateRecipeContainer>
    </BasePageComponent>
  );
};

export default CreateRecipe;

const CreateRecipeContainer = styled.div`
  width: 110rem;
  margin: auto;
`;
