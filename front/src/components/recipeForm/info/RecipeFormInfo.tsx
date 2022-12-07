import styled from 'styled-components';
import RecipeFormInfoLeft from './RecipeFormInfoLeft';
import RecipeFormInfoRight from './RecipeFormInfoRight';
import { RecipeFormHeader } from '../../../styles/recipeFormStyle';
import { MediumTitle } from '../../../styles/commonStyle';

const RecipeFormInfo = () => {
  return (
    <RecipeFormInfoConatiner>
      <RecipeFormInfoHeader>
        <RecipeFormInfoTitle>레시피 등록</RecipeFormInfoTitle>
      </RecipeFormInfoHeader>
      <RecipeFormInfoBody>
        <RecipeFormInfoLeft />
        <RecipeFormInfoRight />
      </RecipeFormInfoBody>
    </RecipeFormInfoConatiner>
  );
};

export default RecipeFormInfo;

const RecipeFormInfoConatiner = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')};
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

const RecipeFormInfoBody = styled.section`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 100rem;
  gap: ${({ theme }) => theme.spacingLarge};
`;

const RecipeFormInfoHeader = styled(RecipeFormHeader)``;

const RecipeFormInfoTitle = styled.h2`
  ${MediumTitle};
  color: ${({ theme }) => theme.mainBlack};
`;
