import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SuggestionRecipe from '../components/recipe/SuggestionRecipe';
import searchImg from '../assets/searchImg.png';
import { MediumTitle } from '../styles/commonStyle';
import Search from '../components/common/Search';

const Recipe = () => {
  return (
    <Container>
      <SearchContainer>
        <SearchTitle>
          400가지 이상의 다양한 한식레시피를 검색해보세요!
        </SearchTitle>
        <Search />
      </SearchContainer>
      <RecipeContainer>
        <SuggestionRecipe>오늘의 추천 RECIPE!</SuggestionRecipe>
        <SuggestionRecipe>맛있고 다양한 한식 RECIPE!</SuggestionRecipe>
      </RecipeContainer>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'start')};
`;
const SearchContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  gap: 3vh;
  height: 40vh;
  width: 100%;
  background-image: url(${searchImg});
  background-size: cover;
  background-position: center;
`;
const SearchTitle = styled.h2`
  ${MediumTitle}
`;
const RecipeContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  gap: 10vh;
  padding: 3% 8%;
`;

export default Recipe;
