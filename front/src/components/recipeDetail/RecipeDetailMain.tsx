import styled from 'styled-components';
import { MediumSubTitle, TextTwo } from '../../styles/commonStyle';
import CustomIcon from '../../components/icons/CustomIcon';
import { theme } from '../../styles/theme';
import Like from '../../components/recipeDetail/Like';
import {
  RecipeDetailContainerStyle,
  RecipeDetailTitleStyle,
  RecipeDetailSubTitleStyle,
} from '../../styles/recipeDetailStyle';
import { RecipeDetailValue } from '../../types/recipe/recipeDetailType';

const RecipeDetailMain = ({
  recipeDetail,
}: {
  recipeDetail: RecipeDetailValue;
}) => {
  const { name, views, recipeLikes, serving, cookingTime } = recipeDetail;
  return (
    <MainContainer>
      <RecipeImage itemProp="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00636_2.png"></RecipeImage>

      <RecipeInfoContiner>
        <TitleContainer>
          <Title>{name}</Title>
          <LikeCount>
            조회수 {views} / 좋아요 {recipeLikes}
          </LikeCount>
        </TitleContainer>
        <TextInfo>우리나라의 전통음식 비빔밥 레시피입니다!</TextInfo>
        <BasicInformationContainer>
          <Serving>
            <CustomIcon name="people" size="25" color={theme.darkGrey} />
            <SubTitle>{serving}인분</SubTitle>
          </Serving>
          <CookingTime>
            <CustomIcon name="clock" size="25" color={theme.darkGrey} />
            <SubTitle>{cookingTime}분</SubTitle>
          </CookingTime>

          <Like />
        </BasicInformationContainer>
      </RecipeInfoContiner>
    </MainContainer>
  );
};

const MainContainer = styled.section`
  ${RecipeDetailContainerStyle}
  gap: ${({ theme }) => theme.spacingLarge};
  margin: ${({ theme }) => theme.spacingMedium} 0;
`;

const RecipeImage = styled.div`
  width: 50rem;
  height: 50rem;
  background-image: ${({ itemProp }) => `url(${itemProp})`};
  background-size: cover;
  background-position: center;
`;
const RecipeInfoContiner = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'start')};
  width: 80rem;
  gap: ${({ theme }) => theme.spacingMedium};
`;

const TitleContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row', 'end')};
  gap: ${({ theme }) => theme.spacingMedium};
`;
const Title = styled.h2`
  ${RecipeDetailTitleStyle};
`;

const LikeCount = styled.span`
  ${MediumSubTitle};
  font-size: ${({ theme }) => theme.fontRegular};
`;
const BasicInformationContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-around')};
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge} 0;
  gap: ${({ theme }) => theme.spacingMedium};
  border-bottom: 1px solid ${({ theme }) => theme.darkGrey};
`;
const SubTitle = styled.span`
  ${({ theme }) =>
    theme.mixins.title(theme.fontSemiMedium, '400', theme.darkGrey)}
`;

const TextInfo = styled.p`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightRegular,
      theme.darkGrey,
    )}
`;

const Serving = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row')}
  gap: ${({ theme }) => theme.spacingMedium};
`;

const CookingTime = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row')}
  gap: ${({ theme }) => theme.spacingMedium};
`;
export default RecipeDetailMain;
