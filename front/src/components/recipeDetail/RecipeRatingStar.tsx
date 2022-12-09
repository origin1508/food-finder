import { useState } from 'react';
import useRating from '../../hooks/Recipe/useRating';
import { BsFillStarFill } from 'react-icons/bs';
import styled from 'styled-components';
import {
  RecipeDetailContainerStyle,
  RecipeDetailHeader,
  RecipeDetailTitleStyle,
  RecipeDetailSubTitleStyle,
} from '../../styles/recipeDetailStyle';

const RecipeRatingStar = ({ recipeId }: { recipeId: string }) => {
  const { mutate } = useRating(recipeId);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];
  let score = clicked.filter(Boolean).length;

  const handleStarClick = (index: number) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const handleRatingButtonClick = () => {
    mutate({ recipeId, score });
  };

  return (
    <RecipeRatingContainer>
      <RecipeRatingHeader>
        <Title>레시피 만족도</Title>
        <SubTitle>별점 매기기</SubTitle>
      </RecipeRatingHeader>
      <RatingTitle>당신의 평점은 ?</RatingTitle>
      <RatingBox>
        {array.map((el) => (
          <BsFillStarFill
            key={el}
            onClick={() => handleStarClick(el)}
            className={clicked[el] ? 'black' : ''}
            size="35"
          />
        ))}
      </RatingBox>
      <Button onClick={handleRatingButtonClick}>평점 등록</Button>
    </RecipeRatingContainer>
  );
};

const RecipeRatingContainer = styled.section`
  ${RecipeDetailContainerStyle}
`;

const RecipeRatingHeader = styled.header`
  ${RecipeDetailHeader};
`;

const Title = styled.h2`
  ${RecipeDetailTitleStyle}
`;
const SubTitle = styled.h4`
  ${RecipeDetailSubTitleStyle}
`;
const RatingTitle = styled.h2`
  ${RecipeDetailTitleStyle}
`;
const RatingBox = styled.div`
  margin: ${({ theme }) => theme.spacingMedium}; auto;
  ${({ theme }) => theme.mixins.flexBox()}
  gap : ${({ theme }) => theme.spacingMedium};
  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }
  :hover svg {
    color: black;
  }
  & svg:hover ~ svg {
    color: #c4c4c4;
  }
  .black {
    color: black;
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.mixins.mediumButton()}
`;

export default RecipeRatingStar;
