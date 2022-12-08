import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillStarFill } from 'react-icons/bs';

const RecipeScoreStatus = ({ score }: { score: number }) => {
  const array = [0, 1, 2, 3, 4];
  const [recipeScore, setRecipeScore] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const ratingStatus = (index: number) => {
    let scoreStates = [...recipeScore];
    for (let i = 0; i < 5; i++) {
      scoreStates[i] = i <= index ? true : false;
    }
    setRecipeScore(scoreStates);
  };
  useEffect(() => {
    ratingStatus(score - 1);
  }, []);

  return (
    <RecipeRaitingContiner>
      {array.map((el) => (
        <BsFillStarFill
          key={el}
          className={recipeScore[el] ? 'black' : ''}
          size="25"
        />
      ))}
    </RecipeRaitingContiner>
  );
};

const RecipeRaitingContiner = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixins.flexBox}
  gap : ${({ theme }) => theme.spacingMedium};
  & svg {
    color: #c4c4c4;
  }
  .black {
    color: black;
  }
`;

export default RecipeScoreStatus;
