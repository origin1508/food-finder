import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { authState, isLoginSelector } from '../atom/auth';
import { useRecipeDetail } from '../hooks/Recipe/useRecipes';
import styled from 'styled-components';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeDetailMain from '../components/recipeDetail/RecipeDetailMain';
import RecipeDetailIngredient from '../components/recipeDetail/RecipeDetaiIngredient';
import RecipeSteps from '../components/recipeDetail/RecipeSteps';
import RecipeComment from '../components/recipeDetail/RecipeComment';
import { PATH } from '../customRouter';
import RecipeRatingStar from '../components/recipeDetail/RecipeRatingStar';

const RecipeDetail = () => {
  const [isEditor, setIsEditor] = useState(false);
  const isLogin = useRecoilValue(isLoginSelector);
  const user = useRecoilValue(authState);
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { data: recipeDetail } = useRecipeDetail(recipeId!);
  const { ingredient, Steps, RecipeComments } = recipeDetail!;
  const recipeWriter = recipeDetail?.writer.userId;
  const userId = user!.userId;

  useEffect(() => {
    if (!isLogin) {
      navigate(PATH.LOGIN);
    }
    recipeWriter === userId ? setIsEditor(true) : setIsEditor(false);
  }, [isLogin, recipeDetail]);
  return (
    <BasePageComponent>
      <RecipeDetailContainer>
        <RecipeDetailMain recipeDetail={recipeDetail!} isEditor={isEditor} />
        <RecipeDetailIngredient ingredient={ingredient} />
        <RecipeSteps steps={Steps} />
        <RecipeRatingStar recipeId={recipeId!} />
        <RecipeComment comments={RecipeComments} recipeId={recipeId!} />
      </RecipeDetailContainer>
    </BasePageComponent>
  );
};

const RecipeDetailContainer = styled.article`
  width: 110rem;
  margin: auto;
`;

export default RecipeDetail;
