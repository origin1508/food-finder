import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RecipeCard from '../recipe/RecipeCard';
import { AuthRecipe } from '../../hooks/Auth/useAuthRecipes';
import { BaseComponentType } from '../../types/common/baseComponentType';
interface UserRecipeCards extends BaseComponentType {
  recipes: AuthRecipe[];
}
const UserRecipeCards = ({ recipes, children }: UserRecipeCards) => {
  const [isRecipesLength, setIsRecipesLength] = useState(false);
  const navigate = useNavigate();
  const handleClickDetail = (userId: number) => {
    const recipeDetailPagePath = `/recipe/detail/${userId}`;
    navigate(recipeDetailPagePath);
  };

  useEffect(() => {
    if (recipes.length > 0) {
      return setIsRecipesLength(true);
    }
  }, [recipes]);

  return (
    <UserRecipeCardsContainer>
      <RecipeCards>
        {isRecipesLength ? (
          <Wrap>
            {recipes.map((recipe) => {
              return (
                <RecipeCard
                  img={recipe.image_url2}
                  title={recipe.name}
                  channelUuid={recipe.dish_id}
                  views={recipe.views}
                  likes={recipe.likes}
                  onClickDetailPage={() => handleClickDetail(recipe.dish_id)}
                  size="19"
                  key={recipe.dish_id}
                />
              );
            })}
          </Wrap>
        ) : (
          <Text>{children}</Text>
        )}
      </RecipeCards>
    </UserRecipeCardsContainer>
  );
};

const UserRecipeCardsContainer = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixins.flexBox('column')};
  gap: 2rem;
  padding 0 3vh;
`;

const RecipeCards = styled.div`
  width: 100%;
  height: 27vh;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.bpSmallest}) {
    height: 15vh;
  }
`;
const Wrap = styled.div`
  display: flex;
  height: 100%;
  flex-flow: row wrap;
  gap: 2.5vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  &:: {
    ::after {
      content: '';
      flex: auto;
    }
  }
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    ${({ theme }) => theme.mixins.flexBox()}
  }
`;

const Text = styled.p`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightRegular,
      theme.mainBlack,
    )}
  line-height: 1.7;
`;

export default UserRecipeCards;
