import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useMediaQuery from '../../hooks/useMediaQuery';
import RecipeCard from '../recipe/RecipeCard';
import CustomIcon from '../icons/CustomIcon';
import { searchResultState } from '../../atom/searchResult';
import { SearchValue } from '../../types/search/searchType';
import { BigTitle, MediumTitle } from '../../styles/commonStyle';
import backgroundImage from '../../assets/background.jpg';

const RecipeResult = ({ keyword }: SearchValue) => {
  const searchResult = useRecoilValue(searchResultState);
  const resultLength = useMemo(() => searchResult.length, [searchResult]);
  const [countPerSlide, setCountPerSlice] = useState(5);
  const [slide, setSlide] = useState(0);
  const images = searchResult.reduce<string[]>((acc, cur) => {
    return [...acc, cur.image_url1];
  }, []);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();
  const maxBpLarge = useMediaQuery('(max-width: 1000px)');
  const maxBpSmall = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    const loop = setInterval(() => {
      setImageIndex((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
    }, 5000);
    return () => {
      clearInterval(loop);
    };
  }, [searchResult, imageIndex, setImageIndex]);

  useEffect(() => {
    if (maxBpSmall) {
      setCountPerSlice(3);
    } else if (maxBpLarge) {
      setCountPerSlice(4);
    } else {
      setCountPerSlice(5);
    }
  }, [maxBpLarge, maxBpSmall]);

  const handleNextButton = useCallback(() => {
    setSlide((prev) =>
      prev + 1 > resultLength - countPerSlide ? 0 : prev + 1,
    );
  }, [resultLength, countPerSlide]);

  const handlePrevButton = useCallback(() => {
    setSlide((prev) =>
      prev - 1 < 0 ? resultLength - countPerSlide : prev - 1,
    );
  }, [resultLength, countPerSlide]);

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
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((item) => {
            const { dish_id, name, views, image_url1, likes, nickname } = item;
            return (
              <RecipeCardContainer
                key={dish_id}
                slide={slide}
                countPerSlide={countPerSlide}
              >
                <RecipeCard
                  img={image_url1}
                  title={name}
                  channelUuid={dish_id}
                  views={views}
                  likes={likes}
                  creator={nickname}
                  size="23"
                  onClickDetailPage={() => {
                    navigate(`/recipe/detail/${dish_id}`);
                  }}
                />
              </RecipeCardContainer>
            );
          })
        ) : (
          <RecipeResultEmpty>등록된 레시피가 없습니다.</RecipeResultEmpty>
        )}
        {resultLength > countPerSlide && (
          <>
            <PrevButton onClick={handlePrevButton}>
              <CustomIcon name="prev" size="20" color="white" />
            </PrevButton>
            <NextButton onClick={handleNextButton}>
              <CustomIcon name="next" size="20" />
            </NextButton>
          </>
        )}
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
  height: 20vw;
  width: 100vw;
  background-image: ${({ url }) =>
    url ? `url(${url});` : `url(${backgroundImage});`}
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: background-image 1.5s;
`;

const RecipeResultImgTitle = styled.h2`
  ${BigTitle};
  position: absolute;
  top: 0;
  width: 100vw;
  height: 20vw;
  line-height: 20vw;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const RecipeResultTitle = styled.h2`
  ${MediumTitle}
  align-self: start;
  color: ${({ theme }) => theme.mainBlack};
`;

const RecipeResultList = styled.div`
  position: relative;
  white-space: nowrap;
  height: 20%;
  width: 100%;
  overflow: hidden;
`;

const RecipeCardContainer = styled.div<{
  slide: number;
  countPerSlide: number;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ countPerSlide }) => `${100 / countPerSlide}%`};
  padding: ${({ theme }) => theme.spacingRegular};
  transform: ${({ slide }) => `translateX( ${-100 * slide}%)`};
  transition: transform 0.5s ease;
`;

const PrevButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox}
  position: absolute;
  cursor: pointer;
  top: 35%;
  left: 0.5%;
  background-color: ${({ theme }) => theme.mainWhite};
  width: 4vh;
  height: 4vh;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const NextButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox}
  position: absolute;
  cursor: pointer;
  top: 35%;
  right: 0.5%;
  background-color: ${({ theme }) => theme.mainWhite};
  width: 4vh;
  height: 4vh;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const RecipeResultEmpty = styled.div`
  width: 100%;
  padding: 5rem;
  text-align: center;
`;
