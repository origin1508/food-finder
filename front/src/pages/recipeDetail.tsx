import { useEffect } from 'react';
import { useRecipeDetail } from '../hooks/Recipe/useRecipes';
import styled from 'styled-components';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeDetailMain from '../components/recipeDetail/RecipeDetailMain';
import RecipeDetailIngredient from '../components/recipeDetail/RecipeDetaiIngredient';
import RecipeSteps from '../components/recipeDetail/RecipeSteps';
import mockData from '../util/mockData';
import ConfirmModal from '../components/modal/ConfirmModal';
import useModal from '../hooks/useModal';
import RecipeComment from '../components/recipeDetail/RecipeComment';

const RecipeDetail = () => {
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
        <RecipeComment />
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
