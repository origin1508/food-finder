import styled from 'styled-components';
import CreateRecipeMainLeft from './CreateRecipeMainLeft';
import CreateRecipeMainRight from './CreateRecipeMainRight';
import { CreateRecipeHeader } from '../../../styles/createRecipeStyle';
import { MediumTitle } from '../../../styles/commonStyle';

const CreateRecipeMain = () => {
  return (
    <CreateRecipeMainConatiner>
      <CreateRecipeMainHeader>
        <CreateRecipeMainTitle>레시피 등록</CreateRecipeMainTitle>
      </CreateRecipeMainHeader>
      <CreateRecipeMainBody>
        <CreateRecipeMainLeft />
        <CreateRecipeMainRight />
      </CreateRecipeMainBody>
    </CreateRecipeMainConatiner>
  );
};

export default CreateRecipeMain;

const CreateRecipeMainConatiner = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')};
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

const CreateRecipeMainBody = styled.div`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 100rem;
  gap: ${({ theme }) => theme.spacingLarge};
`;

const CreateRecipeMainHeader = styled(CreateRecipeHeader)``;

const CreateRecipeMainTitle = styled.div`
  ${MediumTitle};
  color: ${({ theme }) => theme.mainBlack};
`;
