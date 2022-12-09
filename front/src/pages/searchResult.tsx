import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchForm from '../hooks/useSearchForm';
import styled from 'styled-components';
import RecipeResult from '../components/searchResult/RecipeResult';
import PlaceResult from '../components/searchResult/PlaceResult';
import BasePageComponent from '../hoc/BasePageComponent';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { recipeSearch } = useSearchForm();
  useEffect(() => {
    if (keyword && keyword !== null) {
      (async () => {
        await recipeSearch(keyword);
      })();
    }
  }, [keyword]);

  return (
    <BasePageComponent>
      <SearchResultWrapper>
        <SearchResultContainer>
          <RecipeResult keyword={keyword!} />
          <PlaceResult keyword={keyword!} />
        </SearchResultContainer>
      </SearchResultWrapper>
    </BasePageComponent>
  );
};

export default SearchResult;

const SearchResultWrapper = styled.article`
  width: 100%;
  overflow-x: hidden;
`;

const SearchResultContainer = styled.section`
  width: calc(24vh * 5 + 20rem);
  height: 100%;
  margin: 0 auto;
`;
