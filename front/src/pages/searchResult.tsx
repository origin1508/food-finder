import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import RecipeResult from '../components/searchResult/RecipeResult';
import PlaceResult from '../components/searchResult/PlaceResult';

const SearchResult = () => {
  const { keyword } = useParams();
  return (
    <SearchResultWrapper>
      <SearchResultContainer>
        <RecipeResult keyword={keyword!} />
        <PlaceResult keyword={keyword!} />
      </SearchResultContainer>
    </SearchResultWrapper>
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
