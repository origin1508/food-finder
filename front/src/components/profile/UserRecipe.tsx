import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atom/auth';
import styled from 'styled-components';
import {
  useAuthRecipes,
  useAuthLikeRecipes,
} from '../../hooks/Auth/useAuthRecipes';
import { MediumTitle } from '../../styles/commonStyle';
import UserRacipeCards from './UserRecipeCards';
const UserRecipe = () => {
  const user = useRecoilValue(authState);
  const userId = user!.userId;
  const { data: authRecipe } = useAuthRecipes(userId);
  const { data: authLickeRecipe } = useAuthLikeRecipes();

  useEffect(() => {
    console.log(authRecipe);
  }, []);
  return (
    <>
      <UserRecipeContainer>
        <LikeRecipe>
          <UserRacipeCards>Likes Recipe</UserRacipeCards>
        </LikeRecipe>
        <MyRecipe>
          <UserRacipeCards>My Recipe</UserRacipeCards>
        </MyRecipe>
      </UserRecipeContainer>
    </>
  );
};

const UserRecipeContainer = styled.section`
  width: 100%;
  height: 80vh;
  background-color: ${({ theme }) => theme.mainWhite};
  border-radius: 1rem;
  border: 1px ${({ theme }) => theme.darkGrey};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const LikeRecipe = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  height:50%;
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.lightDarkGrey};
`;
const MyRecipe = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  height:50%;
  padding: 2rem 0;
`;
const Title = styled.h2`
  ${MediumTitle}
  color : ${({ theme }) => theme.mainBlack};
`;
export default UserRecipe;
