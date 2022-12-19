import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSearchForm from '../hooks/useSearchForm';
import SuggestionRecipe from '../components/recipe/SuggestionRecipe';
import searchImg from '../assets/searchImg.png';
import { MediumTitle } from '../styles/commonStyle';
import Search from '../components/common/Search';
import ImageSearch from '../components/common/ImageSearch';
import { useRandomRecipes, useRecipeRanking } from '../hooks/Recipe/useRecipes';
import { PATH } from '../customRouter';

const Recipe = () => {
  const navigate = useNavigate();
  const { register, handleRecipeSearch } = useSearchForm();
  const { data: randomRecipe } = useRandomRecipes();
  const { data: recipeRanking } = useRecipeRanking();

  if (randomRecipe === undefined || recipeRanking === undefined) return null;

  return (
    <Container>
      <HeaderContainer>
        <SearchTitle>다양한 레시피와 관련 맛집을 검색해보세요!</SearchTitle>
        <SearchContainer>
          <Search register={register} onSubmit={handleRecipeSearch} />
          <ImageSearch />
        </SearchContainer>
      </HeaderContainer>
      <RecipeContainer>
        <SuggestionRecipeContainer>
          <TitleContainer>
            <Title>금주의 추천 RECIPE!</Title>
          </TitleContainer>
          <SuggestionRecipe recipes={recipeRanking} />
        </SuggestionRecipeContainer>
        <SuggestionRecipeContainer>
          <TitleContainer>
            <Title>맛있고 다양한 음식 RECIPE!</Title>
            <MoreRecipe onClick={() => navigate(PATH.COLLECT_RECIPES)}>
              더 보기
            </MoreRecipe>
          </TitleContainer>

          <SuggestionRecipe recipes={randomRecipe} />
        </SuggestionRecipeContainer>
      </RecipeContainer>
    </Container>
  );
};

const Container = styled.article`
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'start')};
`;
const HeaderContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')}
  gap: 3vh;
  height: 40vh;
  width: 100%;
  background-image: url(${searchImg});
  background-size: cover;
  background-position: center;
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    height: 30vh;
  }
  @media (max-width: ${({ theme }) => theme.bpSmall}) {
    height: 25vh;
  }
`;
const SearchTitle = styled.h2`
  ${MediumTitle}
`;

const SearchContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  gap: ${({ theme }) => theme.spacingSemiMedium}
`;
const RecipeContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  gap: 5vh;
  padding: 3% 8%;
`;
const SuggestionRecipeContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  gap : ${({ theme }) => theme.spacingMedium};
`;

const TitleContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row', 'end', 'start')}
  gap: ${({ theme }) => theme.spacingMedium};
  padding-left: ${({ theme }) => theme.spacingMedium};
  width: 100%;
  @media (max-width: ${({ theme }) => theme.bpSmall}) {
    padding: 0 8%;
  }
`;
const Title = styled.h2`
  ${MediumTitle}
  color:${({ theme }) => theme.mainBlack};
  font-size: ${({ theme }) => theme.fontSemiMedium};
`;

const MoreRecipe = styled.div`
  cursor: pointer;
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiRegular,
      theme.weightSemiBold,
      theme.darkGrey,
    )}
`;

export default Recipe;
