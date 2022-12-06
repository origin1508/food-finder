import styled from 'styled-components';
import CreateRecipeInfoLeft from './CreateRecipeInfoLeft';
import CreateRecipeInfoRight from './CreateRecipeInfoRight';
import { CreateRecipeHeader } from '../../../styles/createRecipeStyle';
import { MediumTitle } from '../../../styles/commonStyle';

const CreateRecipeInfo = () => {
  return (
    <CreateRecipeInfoConatiner>
      <CreateRecipeInfoHeader>
        <CreateRecipeInfoTitle>레시피 등록</CreateRecipeInfoTitle>
      </CreateRecipeInfoHeader>
      <CreateRecipeInfoBody>
        <CreateRecipeInfoLeft />
        <CreateRecipeInfoRight />
      </CreateRecipeInfoBody>
    </CreateRecipeInfoConatiner>
  );
};

export default CreateRecipeInfo;

const CreateRecipeInfoConatiner = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')};
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

const CreateRecipeInfoBody = styled.section`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 100rem;
  gap: ${({ theme }) => theme.spacingLarge};
`;

const CreateRecipeInfoHeader = styled(CreateRecipeHeader)``;

const CreateRecipeInfoTitle = styled.h2`
  ${MediumTitle};
  color: ${({ theme }) => theme.mainBlack};
`;
