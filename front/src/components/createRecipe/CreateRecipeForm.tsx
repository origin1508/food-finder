import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useCreateRecipe from '../../hooks/useCreateRecipe';
import useSetAlert from '../../hooks/useSetAlert';
import CreateRecipeInfo from './info/CreateRecipeInfo';
import CreateRecipeIngredient from './ingredient/CreateRecipeIngredient';
import CreateRecipeInstruction from './instruction/CreateRecipeInstruction';
import { CreateRecipeContainerStyle } from '../../styles/createRecipeStyle';
import { CreateRecipeValue } from '../../types/recipe/createRecipeType';

const CreateRecipeForm = () => {
  const { handleSubmit } = useFormContext<CreateRecipeValue>();
  const navigate = useNavigate();
  const { mutate: createRecipe, isLoading } = useCreateRecipe();
  const { setAlertLoading } = useSetAlert();

  const handleCreateRecipe = handleSubmit((data) => {
    isLoading && setAlertLoading({ loading: true });
    createRecipe(data);
  });

  return (
    <CreateRecipeFormConatiner onSubmit={handleCreateRecipe}>
      <CreateRecipeInfo />
      <CreateRecipeIngredient />
      <CreateRecipeInstruction />
      <CreateRecipeFormButtonContainer>
        <CreatRecipeSubmitButton type="submit">저장</CreatRecipeSubmitButton>
        <CreateRecipeCancleButton type="button" onClick={() => navigate(-1)}>
          취소
        </CreateRecipeCancleButton>
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
