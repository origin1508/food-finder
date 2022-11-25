import styled from 'styled-components';
import CustomIcon from '../../icons/CustomIcon';
import {
  CreateRecipeHeader,
  CreateRecipeInputStyle,
} from '../../../styles/createRecipeStyle';
import { MediumTitle } from '../../../styles/commonStyle';

const CreateRecipeIngredient = () => {
  return (
    <CreateRecipeIngredientContainer>
      <CreateRecipeIngredientHeader>
        <CreateRecipeIngredienTitle>재료</CreateRecipeIngredienTitle>
      </CreateRecipeIngredientHeader>
      <CreateRecipeIngredientAddButton type="button">
        {<CustomIcon name="plusCircle" size="20" />} 추가
      </CreateRecipeIngredientAddButton>
    </CreateRecipeIngredientContainer>
  );
};

export default CreateRecipeIngredient;

const CreateRecipeIngredientContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

const CreateRecipeIngredientHeader = styled(CreateRecipeHeader)``;

const CreateRecipeIngredienTitle = styled.div`
  ${MediumTitle}
  color: ${({ theme }) => theme.mainBlack}
`;

const CreateRecipeIngredientAddButton = styled.button``;
