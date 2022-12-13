import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import RecipeFormInfo from './info/RecipeFormInfo';
import RecipeFormIngredient from './ingredient/RecipeFormIngredient';
import RecipeFormInstruction from './instruction/RecipeFormInstruction';
import { RecipeFormContainerStyle } from '../../styles/recipeFormStyle';
import {
  RecipeFormProps,
  RecipeFormDefaultValue,
} from '../../types/recipe/recipeFormType';

const RecipeForm = ({ onSubmit }: RecipeFormProps) => {
  const { handleSubmit } = useFormContext<RecipeFormDefaultValue>();
  const navigate = useNavigate();

  return (
    <RecipeFormConatiner onSubmit={handleSubmit(onSubmit)}>
      <RecipeFormInfo />
      <RecipeFormIngredient />
      <RecipeFormInstruction />
      <RecipeFormButtonContainer>
        <RecipeFormSubmitButton type="submit">저장</RecipeFormSubmitButton>
        <RecipeFormCancleButton type="button" onClick={() => navigate(-1)}>
          취소
        </RecipeFormCancleButton>
      </RecipeFormButtonContainer>
    </RecipeFormConatiner>
  );
};

export default RecipeForm;

const RecipeFormConatiner = styled.form`
  ${({ theme }) => theme.mixins.flexBox('column')};
  margin: ${({ theme }) => theme.spacingLarge} 0;
  gap: ${({ theme }) => theme.spacingRegular};
`;

const RecipeFormButtonContainer = styled.section`
  ${RecipeFormContainerStyle};
  ${({ theme }) => theme.mixins.flexBox()};
  gap: ${({ theme }) => theme.spacingLarge};
`;

const RecipeFormSubmitButton = styled.button`
  ${({ theme }) => theme.mixins.button()}
  background-color: ${({ theme }) => theme.themeColor};
  color: ${({ theme }) => theme.mainWhite};
`;

const RecipeFormCancleButton = styled.button`
  ${({ theme }) => theme.mixins.button()};
`;
