import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  RecipeDetailContainerStyle,
  RecipeDetailHeader,
  RecipeDetailTitleStyle,
  RecipeDetailSubTitleStyle,
} from '../../styles/recipeDetailStyle';

const RecipeDetailIngredient = ({ ingredient }: { ingredient: string }) => {
  const [ingredients, setIngredient] = useState<string[]>([]);
  useEffect(() => {
    const list = ingredient.split(',');
    setIngredient((prev) => {
      return [...prev, ...list];
    });
  }, [ingredient]);
  return (
    <RecipeDetailIngredientContainer>
      <RecipeDetailIngredientHeader>
        <Title>재료</Title>
        <SubTitle>Ingredients</SubTitle>
      </RecipeDetailIngredientHeader>
      <IngredientList>
        {ingredients.map((item, index) => (
          <Ingredient key={index}>
            <IngredientName>{item}</IngredientName>
          </Ingredient>
        ))}
      </IngredientList>
    </RecipeDetailIngredientContainer>
  );
};

const RecipeDetailIngredientContainer = styled.section`
  ${RecipeDetailContainerStyle}
`;

const RecipeDetailIngredientHeader = styled.header`
  ${RecipeDetailHeader};
`;

const Title = styled.h2`
  ${RecipeDetailTitleStyle}
`;
const SubTitle = styled.h4`
  ${RecipeDetailSubTitleStyle}
`;

const IngredientList = styled.ul`
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-between')}
  flex-wrap:wrap;
  width: 80rem;
  gap: ${({ theme }) => theme.spacingLargest};
`;
const Ingredient = styled.li`
  ${({ theme }) => theme.mixins.flexBox('row', 'start', 'space-between')}
  width: 40%;
  padding: ${({ theme }) => theme.spacingRegular};
  border-bottom: 1px solid ${({ theme }) => theme.lightDarkGrey};
`;

const IngredientName = styled.span`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightRegular,
      theme.darkGrey,
    )}
`;

const IngredientAmount = styled.span`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightRegular,
      theme.darkGrey,
    )}
`;
export default RecipeDetailIngredient;
