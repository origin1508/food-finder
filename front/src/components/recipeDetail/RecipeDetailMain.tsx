import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import useEditRecipe from '../../hooks/Recipe/useEditRecipe';
import { MediumSubTitle, SmallTitle } from '../../styles/commonStyle';
import CustomIcon from '../../components/icons/CustomIcon';
import { theme } from '../../styles/theme';
import Like from '../../components/recipeDetail/Like';
import {
  RecipeDetailContainerStyle,
  RecipeDetailTitleStyle,
} from '../../styles/recipeDetailStyle';
import { RecipeDetailInitial } from '../../types/recipe/recipeDetailType';
import RecipeScoreStatus from './RecipeScoreStatus';
import ConfirmModal from '../modal/ConfirmModal';

const RecipeDetailMain = ({
  recipeDetail,
  isEditor,
}: {
  recipeDetail: RecipeDetailInitial;
  isEditor: boolean;
}) => {
  const [isOpenModal, handleModalOpenButtonClick, handleModalCloseButtonClick] =
    useModal(false);
  const {
    name,
    views,
    RecipeLikes,
    serving,
    cookingTime,
    writer,
    smallThumbnailUrl,
    starAverage,
    liked,
    dishId: recipeId,
  } = recipeDetail;
  const navigate = useNavigate();
  const {
    recipeDeleteMutation: { mutate: recipeDelete },
  } = useEditRecipe();

  const handleClickImage = () => {
    const path = `/profile/${writer.userId}`;
    navigate(path);
  };
  const handleAcceptClick = () => {
    recipeDelete(recipeId);
  };

  return (
    <MainContainer>
      <RecipeImage itemProp={smallThumbnailUrl} onClick={handleClickImage}>
        <WriterInfoContainer>
          <WriterImage src={writer.profileUrl} />
          <WriterNickname>{writer.nickname}</WriterNickname>
        </WriterInfoContainer>
      </RecipeImage>
      <RecipeScoreStatus score={starAverage} />

      <RecipeInfoContiner>
        <TitleContainer>
          <Title>{name}</Title>
          <LikeCount>
            조회수 {views} / 좋아요 {RecipeLikes}
          </LikeCount>
        </TitleContainer>

        <BasicInformationContainer>
          <Serving>
            <CustomIcon name="people" size="25" color={theme.darkGrey} />
            <SubTitle>{serving}인분</SubTitle>
          </Serving>
          <CookingTime>
            <CustomIcon name="clock" size="25" color={theme.darkGrey} />
            <SubTitle>{cookingTime}분</SubTitle>
          </CookingTime>

          <Like recipeId={recipeId} liked={liked} />
        </BasicInformationContainer>
        {isEditor && (
          <RecipeInfoButtonContainer>
            <RecipeInfoButton
              onClick={() => navigate(`/recipe/edit/${recipeId}`)}
            >
              수정
            </RecipeInfoButton>
            <RecipeInfoRemoveButton onClick={handleModalOpenButtonClick}>
              삭제
            </RecipeInfoRemoveButton>
          </RecipeInfoButtonContainer>
        )}
        <ConfirmModal
          isOpenModal={isOpenModal}
          onModalAcceptButtonClickEvent={handleAcceptClick}
          onModalCancelButtonClickEvent={handleModalCloseButtonClick}
        >
          정말 삭제하시겠습니까?
        </ConfirmModal>
      </RecipeInfoContiner>
    </MainContainer>
  );
};

const MainContainer = styled.section`
  ${RecipeDetailContainerStyle}
  gap: ${({ theme }) => theme.spacingLarge};
  margin-top: ${({ theme }) => theme.spacingMedium};
`;

const RecipeImage = styled.div`
  position: relative;
  width: 80rem;
  height: 60rem;
  background-image: ${({ itemProp }) => `url(${itemProp})`};
  background-size: cover;
  background-position: center;
  cursor: pointer;
  margin: 3rem 0 6rem 0;
`;

const WriterInfoContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  gap : 1rem;
  position: absolute;
  bottom: -12rem;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WriterImage = styled.img`
  cursor: pointer;
  width: 10rem;
  height: 10rem;
  border: 2px solid ${({ theme }) => theme.lightDarkGrey};
  border-radius: 100%;
`;
const WriterNickname = styled.h3`
  ${SmallTitle}
`;

const RecipeRaitingContiner = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixins.flexBox}
  gap : ${({ theme }) => theme.spacingMedium};
  & svg {
    color: #c4c4c4;
  }
  .black {
    color: black;
  }
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

const RecipeInfoButtonContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 100%;
  gap: ${({ theme }) => theme.spacingLarge};
`;

const RecipeInfoButton = styled.button`
  ${({ theme }) => theme.mixins.mediumButton()};
`;

const RecipeInfoRemoveButton = styled(RecipeInfoButton)`
  background-color: ${({ theme }) => theme.errorColor};
`;
export default RecipeDetailMain;
