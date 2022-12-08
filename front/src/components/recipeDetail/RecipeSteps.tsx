import styled from 'styled-components';
import { MediumTitle, MediumSubTitle } from '../../styles/commonStyle';
import {
  RecipeDetailContainerStyle,
  RecipeDetailHeader,
  RecipeDetailTitleStyle,
  RecipeDetailSubTitleStyle,
} from '../../styles/recipeDetailStyle';
import { RecipeStepsValue } from '../../types/recipe/recipeDetailType';

const RecipeSteps = ({ steps }: { steps: RecipeStepsValue[] }) => {
  return (
    <RecipeStepsContainer>
      <RecipeStepsHeader>
        <Title>조리순서</Title>
        <SubTitle>Steps</SubTitle>
      </RecipeStepsHeader>
      <Steps>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepNum>{step.step}.</StepNum>
            <StepText>{step.content}</StepText>
            <StepImage itemProp={step.imageUrl} />
          </Step>
        ))}
      </Steps>
    </RecipeStepsContainer>
  );
};

const RecipeStepsContainer = styled.section`
  ${RecipeDetailContainerStyle}
  margin-bottom : ${({ theme }) => theme.spacingMedium}
`;

const RecipeStepsHeader = styled.header`
  ${RecipeDetailHeader};
`;

const Title = styled.h2`
  ${RecipeDetailTitleStyle}
`;
const SubTitle = styled.h4`
  ${RecipeDetailSubTitleStyle}
`;

const Steps = styled.ul`
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-between')}
  flex-wrap:wrap;
  width: 80rem;
  gap: ${({ theme }) => theme.spacingLargest};
`;
const Step = styled.li`
  ${({ theme }) => theme.mixins.flexBox('row', 'start', 'space-between')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingRegular};
  border-bottom: 1px solid ${({ theme }) => theme.lightDarkGrey};
`;

const StepNum = styled.span`
  ${({ theme }) =>
    theme.mixins.title(theme.fontLarge, theme.weightRegular, theme.mainBlack)}
`;

const StepText = styled.p`
  max-width: 40%;
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightRegular,
      theme.darkGrey,
    )}
  line-height: 1.7;
`;

const StepImage = styled.div`
  width: 30rem;
  height: 20rem;
  background-image: ${({ itemProp }) => `url(${itemProp})`};
  background-size: cover;
  background-position: center;
`;
export default RecipeSteps;
