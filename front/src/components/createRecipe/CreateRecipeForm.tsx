import styled from 'styled-components';
import CreateRecipeMain from './main/CreateRecipeMain';
import CreateRecipeIngredient from './ingredient/CreateRecipeIngredient';
import CreateRecipeInstruction from './instruction/CreateRecipeInstruction';
import { CreateRecipeContainerStyle } from '../../styles/createRecipeStyle';

const CreateRecipeForm = () => {
  return (
    <CreateRecipeFormConatiner>
      <CreateRecipeMain />
      <CreateRecipeIngredient />
      <CreateRecipeInstruction />
      <CreateRecipeFormButtonContainer>
        <CreatRecipeSubmitButton type="submit">저장</CreatRecipeSubmitButton>
        <CreateRecipeCancleButton type="button">취소</CreateRecipeCancleButton>
      </CreateRecipeFormButtonContainer>
    </CreateRecipeFormConatiner>
  );
};

export default CreateRecipeForm;

const CreateRecipeFormConatiner = styled.form`
  ${({ theme }) => theme.mixins.flexBox('column')};
  margin: ${({ theme }) => theme.spacingLarge} 0;
  gap: ${({ theme }) => theme.spacingRegular};
`;

const CreateRecipeFormButtonContainer = styled.section`
  ${CreateRecipeContainerStyle};
  ${({ theme }) => theme.mixins.flexBox()};
  gap: ${({ theme }) => theme.spacingLarge};
`;

const CreatRecipeSubmitButton = styled.button`
  ${({ theme }) => theme.mixins.button()}
  background-color: ${({ theme }) => theme.themeColor};
  color: ${({ theme }) => theme.mainWhite};
`;

const CreateRecipeCancleButton = styled.button`
  ${({ theme }) => theme.mixins.button()};
`;
