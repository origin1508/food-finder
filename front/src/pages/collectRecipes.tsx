import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import BasePageComponent from '../hoc/BasePageComponent';
import { MediumTitle, SmallTitle } from '../styles/commonStyle';
import RecipeCard from '../components/recipe/RecipeCard';
import mockData from '../util/mockData';
import CustomIcon from '../components/icons/CustomIcon';
import { theme } from '../styles/theme';
import { PATH } from '../customRouter';
import { getPhotos } from '../api/authFetcher';
import LoadingCycle from '../components/alert/Loader';

const CollectRecipes = () => {
  const navigate = useNavigate();
  const [selectKind, setSelectKind] = useState('전체');
  const [selectMethod, setSelectMethod] = useState('전체');
  const { recipeDatas, filterByType, filterByMethod } = mockData;
  const { ref, inView } = useInView();
  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['photos'],
      async ({ pageParam = 1 }) => {
        return await getPhotos(pageParam);
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextPage;
        },
      },
    );
  if (status === 'loading') return <LoadingCycle />;

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <BasePageComponent>
      <CollectRecipesContainer>
        <Title>맛있고 다양한 레시피 !</Title>
        <PrevButton onClick={() => navigate(PATH.MAIN)}>
          <CustomIcon name="prev" size="50" color={theme.mainBlack} />
        </PrevButton>
        <FilterContainer>
          <Filter>
            <FilterTitle>종류별</FilterTitle>
            <SelectContainer>
              {filterByType.map((type) => (
                <SelectType
                  itemProp={selectKind}
                  itemType={type}
                  name={type}
                  onClick={() => setSelectKind(type)}
                >
                  {type}
                </SelectType>
              ))}
            </SelectContainer>
          </Filter>
          <Filter>
            <FilterTitle>조리방법별</FilterTitle>
            <SelectContainer>
              {filterByMethod.map((type, index) => (
                <SelectMethod
                  key={index}
                  itemProp={selectMethod}
                  itemType={type}
                  name={type}
                  onClick={() => setSelectMethod(type)}
                >
                  {type}
                </SelectMethod>
              ))}
            </SelectContainer>
          </Filter>
        </FilterContainer>
        <RecipeCards>
          <Wrap>
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((photo: any) => (
                  <RecipeCard
                    key={photo.id}
                    img={photo.urls.raw}
                    title={photo.id}
                    channelUuid={photo.id}
                    views={photo.likes}
                    likes={photo.likes}
                    creator={photo.id}
                    onClickDetailPage={() => console.log('click')}
                  ></RecipeCard>
                ))}
              </React.Fragment>
            ))}
          </Wrap>
        </RecipeCards>
        {isFetchingNextPage ? <LoadingCycle /> : <div ref={ref}></div>}
        {hasNextPage ? <div>다음페이지</div> : <div>마지막 페이지</div>}
      </CollectRecipesContainer>
    </BasePageComponent>
  );
};

const CollectRecipesContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  position:relative;
  padding-top: 4vh;
  gap: 4vh;
`;

const Title = styled.h2`
  ${MediumTitle}
  color : ${({ theme }) => theme.mainBlack}
`;

const RecipeCards = styled.div`
  max-width: 134vh;
`;
const Wrap = styled.div`
  flex-wrap: wrap;
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'start')}
  gap: 3rem;
`;

const FilterContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'start')}
  max-width: 134vh;
  width: 100%;
  padding: 3rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.darkGrey};
  gap: 2rem;
`;
const Filter = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
`;
const FilterTitle = styled.h3`
  ${SmallTitle}
  color : ${({ theme }) => theme.themeColor}
  padding : 0 4rem;
`;
const SelectContainer = styled.ul`
  ${({ theme }) => theme.mixins.flexBox}
  padding: 0 4rem;
  gap: 4rem;
`;
const SelectType = styled.button`
  ${({ theme }) => theme.mixins.flexBox}
  ${SmallTitle}
  font-weight: ${({ theme }) => theme.weightRegular};
  ${({ theme, itemType, itemProp }) =>
    itemProp === itemType
      ? `background-color:${theme.themeColor};
    border-radius:2rem;
    padding: 0.5rem 1rem;
    color:${theme.mainWhite};`
      : 'none'};
`;
const SelectMethod = styled.button`
  ${({ theme }) => theme.mixins.flexBox}
  ${SmallTitle}
  font-weight: ${({ theme }) => theme.weightRegular};
  ${({ theme, itemType, itemProp }) =>
    itemProp === itemType
      ? `background-color:${theme.themeColor};
    border-radius:2rem;
    padding: 0.5rem 1rem;
    color:${theme.mainWhite};`
      : 'none'};
`;
const PrevButton = styled.div`
  ${({ theme }) => theme.flexBox}
  position: absolute;
  cursor: pointer;
  top: 3vh;
  left: 13%;
`;
export default CollectRecipes;
