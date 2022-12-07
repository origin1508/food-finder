import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecipeDetail } from '../hooks/Recipe/useRecipes';
import styled from 'styled-components';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeDetailMain from '../components/recipeDetail/RecipeDetailMain';
import RecipeDetailIngredient from '../components/recipeDetail/RecipeDetaiIngredient';
import RecipeSteps from '../components/recipeDetail/RecipeSteps';
import mockData from '../util/mockData';

const RecipeDetail = () => {
  const { userId } = useParams();
  // const { data } = useRecipeDetail(userId!);
  const { recipeDetail } = mockData;
  const firstRecipeDetail = recipeDetail[0];
  const { ingredient } = recipeDetail[0];
  const { steps } = recipeDetail[0];

  // useEffect(() => {
  //   console.log(data);
  // }, []);
  return (
    <BasePageComponent>
      <RecipeDetailContainer>
        <RecipeDetailMain recipeDetail={firstRecipeDetail} />
        <RecipeDetailIngredient ingredient={ingredient} />
        <RecipeSteps steps={steps} />
      </RecipeDetailContainer>
    </BasePageComponent>
  );
};

const RecipeDetailContainer = styled.article`
  width: 110rem;

  margin: auto;
`;

export default RecipeDetail;
