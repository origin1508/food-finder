import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { isLoginSelector } from '../atom/auth';
import { useRecipeDetail } from '../hooks/Recipe/useRecipes';
import styled from 'styled-components';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeDetailMain from '../components/recipeDetail/RecipeDetailMain';
import RecipeDetailIngredient from '../components/recipeDetail/RecipeDetaiIngredient';
import RecipeSteps from '../components/recipeDetail/RecipeSteps';
import RecipeComment from '../components/recipeDetail/RecipeComment';
import { PATH } from '../customRouter';

const RecipeDetail = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { data } = useRecipeDetail(recipeId!);
  const recipeDetail = data![0];
  const { ingredient, Steps, RecipeComments } = recipeDetail;

  useEffect(() => {
    if (!isLogin) {
      navigate(PATH.LOGIN);
    }
  }, [isLogin]);
  return (
    <BasePageComponent>
      <RecipeDetailContainer>
        <RecipeDetailMain recipeDetail={recipeDetail} />
        <RecipeDetailIngredient ingredient={ingredient} />
        <RecipeSteps steps={Steps} />
        <RecipeComment comments={RecipeComments} />
      </RecipeDetailContainer>
    </BasePageComponent>
  );
};

const RecipeDetailContainer = styled.article`
  width: 110rem;

  margin: auto;
`;
const TestButton = styled.button`
  ${({ theme }) => theme.mixins.mediumButton()}
`;
export default RecipeDetail;
