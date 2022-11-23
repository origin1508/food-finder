import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecipeCard from '../../components/recipe/RecipeCard';
import { MediumTitle } from '../../styles/commonStyle';
import CustomIcon from '../../components/icons/CustomIcon';
import { theme } from '../../styles/theme';

const SuggestionRecipe = () => {
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

  return (
    <SuggestionRecipeContainer>
      <Title>오늘의 추천 RECIPE!</Title>
      <RecipeCards>
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

        <PrevButton>
          <CustomIcon name="prev" size="2.5vh" color={theme.mainBlack} />
        </PrevButton>
        <NextButton>
          <CustomIcon name="next" size="2.5vh" color={theme.mainBlack} />
        </NextButton>
      </RecipeCards>
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
  max-width: 80vw;
  overflow: hidden;
  ${({ theme }) => theme.mixins.flexBox}
  gap: 3rem;
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
