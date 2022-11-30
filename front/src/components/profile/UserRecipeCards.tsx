import { useState } from 'react';
import styled from 'styled-components';
import RecipeCard from '../recipe/RecipeCard';
import { MediumTitle } from '../../styles/commonStyle';
import CustomIcon from '../icons/CustomIcon';
import { theme } from '../../styles/theme';
import { BaseComponentType } from '../../types/common/baseComponentType';
import mockData from '../../util/mockData';
const UserRecipeCards = ({ children }: BaseComponentType) => {
  const { recipeDatas } = mockData;
  const [slidePx, setSlidePx] = useState(0);
  const CARD_WIDTH_SIZE = 23;
  const CARDS_WIDTH_SIZE = 68;

  const toPrev = () => {
    slidePx < 0 && setSlidePx(slidePx + CARD_WIDTH_SIZE);
  };

  const toNext = () => {
    slidePx > -CARDS_WIDTH_SIZE && setSlidePx(slidePx - CARD_WIDTH_SIZE);
  };

  return (
    <UserRecipeCardsContainer>
      <Title>{children}</Title>
      <RecipeCards>
        <Wrap results={slidePx}>
          {recipeDatas.map((recipe) => {
            return (
              <RecipeCard
                img={recipe.img}
                title={recipe.title}
                channelUuid={recipe.channelUuid}
                views={recipe.views}
                likes={recipe.likes}
                creator={recipe.creator}
                onMoreClick={recipe.onMoreClick}
                index={recipe.index}
                size="20"
              ></RecipeCard>
            );
          })}
        </Wrap>
      </RecipeCards>
      <PrevButton onClick={() => toPrev()}>
        <CustomIcon name="prev" size="2.5vh" color={theme.mainBlack} />
      </PrevButton>
      <NextButton onClick={() => toNext()}>
        <CustomIcon name="next" size="2.5vh" color={theme.mainBlack} />
      </NextButton>
    </UserRecipeCardsContainer>
  );
};

const UserRecipeCardsContainer = styled.div`
  position: relative;
  ${({ theme }) => theme.mixins.flexBox('column')};
  gap: 4vh;
`;

const Title = styled.h2`
  ${MediumTitle}
  color:${({ theme }) => theme.mainBlack}
`;

const RecipeCards = styled.div`
  max-width: 68vh;
  height: 21vh;
  overflow: hidden;
`;
const Wrap = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'start')}
  gap: 3rem;
  transform: translateX(${({ results }) => `${results}vh`});
  transition: all 0.3s;
`;

const PrevButton = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: -2.5%;
  background-color: ${({ theme }) => theme.mainWhite};
  width: 4vh;
  height: 4vh;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const NextButton = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  position: absolute;
  cursor: pointer;
  top: 50%;
  right: -2.5%;
  background-color: ${({ theme }) => theme.mainWhite};
  width: 4vh;
  height: 4vh;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export default UserRecipeCards;
