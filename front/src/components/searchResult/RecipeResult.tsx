import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import RecipeCard from '../recipe/RecipeCard';
import CustomIcon from '../icons/CustomIcon';
import { searchResultState } from '../../atom/searchResult';
import { SearchValue } from '../../types/search/searchType';
import { BigTitle, MediumTitle } from '../../styles/commonStyle';

const RecipeResult = ({ keyword }: SearchValue) => {
  const searchResult = useRecoilValue(searchResultState);
  const images = searchResult.reduce<string[]>((acc, cur) => {
    return [...acc, cur.image_url1];
  }, []);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const loop = setInterval(() => {
      setImageIndex((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
    }, 5000);
    return () => {
      clearInterval(loop);
    };
  }, [searchResult, imageIndex, setImageIndex]);

  return (
    <RecipeResultContainer>
      <RecipeResultImg url={images[imageIndex]} />
      <RecipeResultImgTitle>{keyword}</RecipeResultImgTitle>
      <RecipeResultTitle>
        <CustomIcon name="quoteLeft" size="16" />
        {keyword}
        <CustomIcon name="quoteRight" size="16" /> RECIPE
      </RecipeResultTitle>
      <RecipeResultList>
        {searchResult.map((item) => {
          const {
            dish_id,
            name,
            views,
            image_url1,
            image_url2,
            likes,
            nickname,
          } = item;
          return (
            <RecipeCard
              key={dish_id}
              img={image_url1}
              title={name}
              channelUuid={dish_id}
              views={views}
              likes={likes}
              creator={nickname}
              onClickDetailPage={() => {
                navigate(`/recipe/detail/${dish_id}`);
              }}
            />
          );
        })}
      </RecipeResultList>
    </RecipeResultContainer>
  );
};

export default RecipeResult;

const RecipeResultContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')};
  position: relative;
  width: 100%;
  height: 80%;
  gap: ${({ theme }) => theme.spacingLarge};
`;

const RecipeResultImg = styled.div<{ url: string }>`
  height: 40vh;
  width: 100vw;
  text-align: center;
  ${({ url }) => `background-image: url('${url}')`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.mainBlack};
  transition: all 1.5s;
`;

const RecipeResultImgTitle = styled.h2`
  ${BigTitle};
  position: absolute;
  top: 0;
  width: 100vw;
  height: 40vh;
  line-height: 40vh;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const RecipeResultTitle = styled.h2`
  ${MediumTitle}
  align-self: start;
  color: ${({ theme }) => theme.mainBlack};
`;

const RecipeResultList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  width: 100%;
  height: 26vh;
  gap: ${({ theme }) => theme.spacingLarge};
`;

const Temp = styled.div<{ url: string }>`
  ${({ url }) => `background-image: url('${url}')`};
  width: 10rem;
  height: 10rem;
  background-color: black;
`;
