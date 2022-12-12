import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import BasePageComponent from '../hoc/BasePageComponent';
import { MediumTitle, SmallTitle } from '../styles/commonStyle';
import RecipeCard from '../components/recipe/RecipeCard';
import filterList from '../util/filterList';
import CustomIcon from '../components/icons/CustomIcon';
import { theme } from '../styles/theme';
import { PATH } from '../customRouter';
import { getPhotos } from '../api/authFetcher';
import { categoryValue, methodValue } from '../atom/filter';
import { RecipeCollectCard } from '../types/recipe/recipeCardType';
import LoadingCycle from '../components/alert/Loader';

const CollectRecipes = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useRecoilState(categoryValue);
  const [method, setMethod] = useRecoilState(methodValue);
  const { categoryList, methodList } = filterList;
  const { ref, inView } = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['photos'],
    async ({ pageParam = '' }) => {
      return await getPhotos({
        pageParams: pageParam,
        method: category === '전체' ? '' : category,
        category: method === '전체' ? '' : method,
      });
    },
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    },
  );

  const handleClickDetail = (userId: number) => {
    const recipeDetailPagePath = `/recipe/detail/${userId}`;
    navigate(recipeDetailPagePath);
  };

  if (status === 'loading') return <LoadingCycle />;

  useEffect(() => {
    console.log(data);
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <BasePageComponent>
      <CollectRecipesContainer>
        <Title>맛있고 다양한 레시피 !</Title>
        <PrevButton onClick={() => navigate(PATH.RECIPE)}>
          <CustomIcon name="prev" size="50" color={theme.mainBlack} />
        </PrevButton>
        <FilterContainer>
          <Filter>
            <FilterTitle>종류별</FilterTitle>
            <SelectContainer>
              {categoryList.map((type, index) => (
                <SelectType
                  key={index}
                  itemProp={category}
                  itemType={type}
                  name={type}
                  onClick={() => {
                    setCategory(type);
                    location.reload();
                  }}
                >
                  {type}
                </SelectType>
              ))}
            </SelectContainer>
          </Filter>
          <Filter>
            <FilterTitle>조리방법별</FilterTitle>
            <SelectContainer>
              {methodList.map((type, index) => (
                <SelectMethod
                  key={index}
                  itemProp={method}
                  itemType={type}
                  name={type}
                  onClick={() => {
                    setMethod(type);
                    location.reload();
                  }}
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
                {page.recipes.map((recipe: RecipeCollectCard) => (
                  <RecipeCard
                    key={recipe.dishId}
                    img={recipe.smallThumbnailUrl!}
                    title={recipe.name}
                    channelUuid={recipe.dishId}
                    views={recipe.views}
                    likes={recipe.likes}
                    onClickDetailPage={() => handleClickDetail(recipe.dishId)}
                    size="42"
                  ></RecipeCard>
                ))}
              </React.Fragment>
            ))}
          </Wrap>
        </RecipeCards>
        {isFetchingNextPage ? <LoadingCycle /> : <div ref={ref}></div>}
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
