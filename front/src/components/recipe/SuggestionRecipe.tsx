import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecipeCard from '../../components/recipe/RecipeCard';
import { MediumTitle } from '../../styles/commonStyle';
import CustomIcon from '../../components/icons/CustomIcon';
import { theme } from '../../styles/theme';
import { BaseComponentType } from '../../util/TypeScript';

const SuggestionRecipe = ({ children }: BaseComponentType) => {
  const sampleData = {
    img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
    title: '김치찌개',
    channelUuid: '12321',
    views: '123',
    likes: '23',
    creator: '들자구',
    onMoreClick: () => console.log('onMoreClick'),
    index: 3,
  };
  const [slidePx, setSlidePx] = useState(0);

  const toPrev = () => {
    slidePx < 0 && setSlidePx(slidePx + 27);
  };

  const toNext = () => {
    slidePx > -132 && setSlidePx(slidePx - 27);
  };

  return (
    <SuggestionRecipeContainer>
      <Title>{children}</Title>
      <RecipeCards>
        <Wrap results={slidePx}>
          <RecipeCard
            img={sampleData.img}
            title="김치찌개1"
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
          <RecipeCard
            img={sampleData.img}
            title={sampleData.title}
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
          <RecipeCard
            img={sampleData.img}
            title={sampleData.title}
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
          <RecipeCard
            img={sampleData.img}
            title={sampleData.title}
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
          <RecipeCard
            img={sampleData.img}
            title={sampleData.title}
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
          <RecipeCard
            img={sampleData.img}
            title={sampleData.title}
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
          <RecipeCard
            img={sampleData.img}
            title={sampleData.title}
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
          <RecipeCard
            img={sampleData.img}
            title={sampleData.title}
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
          <RecipeCard
            img={sampleData.img}
            title={sampleData.title}
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
          <RecipeCard
            img={sampleData.img}
            title={sampleData.title}
            channelUuid={sampleData.channelUuid}
            views={sampleData.views}
            likes={sampleData.likes}
            creator={sampleData.creator}
            onMoreClick={sampleData.onMoreClick}
            index={sampleData.index}
          ></RecipeCard>
        </Wrap>
      </RecipeCards>
      <PrevButton onClick={() => toPrev()}>
        <CustomIcon name="prev" size="2.5vh" color={theme.mainBlack} />
      </PrevButton>
      <NextButton onClick={() => toNext()}>
        <CustomIcon name="next" size="2.5vh" color={theme.mainBlack} />
      </NextButton>
    </SuggestionRecipeContainer>
  );
};

const SuggestionRecipeContainer = styled.div`
  position: relative;
  ${({ theme }) => theme.mixins.flexBox('column')};
  gap: 2vh;
`;

const Title = styled.h2`
  ${MediumTitle}
  color:${({ theme }) => theme.mainBlack}
`;

const RecipeCards = styled.div`
  max-width: 132vh;
  height: 25vh;
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
  left: -1.3%;
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
  right: -1.3%;
  background-color: ${({ theme }) => theme.mainWhite};
  width: 4vh;
  height: 4vh;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
export default SuggestionRecipe;
