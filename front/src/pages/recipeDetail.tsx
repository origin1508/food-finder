import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { authState } from '../atom/auth';
import { useRecipeDetail } from '../hooks/Recipe/useRecipes';
import styled from 'styled-components';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeDetailMain from '../components/recipeDetail/RecipeDetailMain';
import RecipeDetailIngredient from '../components/recipeDetail/RecipeDetaiIngredient';
import RecipeSteps from '../components/recipeDetail/RecipeSteps';
import RecipeComment from '../components/recipeDetail/RecipeComment';
import RecipeRatingStar from '../components/recipeDetail/RecipeRatingStar';

const RecipeDetail = () => {
  const [isEditor, setIsEditor] = useState(false);
  const user = useRecoilValue(authState);
  const { recipeId } = useParams();
  if (recipeId === undefined) return null;
  const { data: recipeDetail } = useRecipeDetail(recipeId);
  if (recipeDetail === undefined) return null;

  const {
    ingredient,
    Steps: steps,
    RecipeComments: recipeComments,
    myStar,
  } = recipeDetail!;
  const ingredients = JSON.parse(ingredient);
  const recipeWriter = recipeDetail?.writer.userId;
  const userId = user?.userId;

  useEffect(() => {
    recipeWriter === userId ? setIsEditor(true) : setIsEditor(false);
  }, [recipeDetail]);

  return (
    <BasePageComponent>
      <RecipeDetailContainer>
        <RecipeDetailMain recipeDetail={recipeDetail} isEditor={isEditor} />
        <RecipeDetailIngredient ingredients={ingredients} />
        <RecipeSteps steps={steps} />
        <RecipeRatingStar recipeId={recipeId} myStar={myStar} />
        <RecipeComment comments={recipeComments} recipeId={recipeId} />
      </RecipeDetailContainer>
    </BasePageComponent>
  );
};

const RecipeDetailContainer = styled.article`
  width: 110rem;
  margin: auto;
  @media (max-width: ${({ theme }) => theme.bpSmall}) {
    width: 80rem;
  }
`;

export default RecipeDetail;
