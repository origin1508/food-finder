import styled from 'styled-components';
import CustomIcon from '../icons/CustomIcon';
import { theme } from '../../styles/theme';
import { SearchProps } from '../../types/search/searchType';

const Search = ({
  display,
  placeholder = '음식, 재료, 태그, 사진검색',
  register,
  onSubmit,
}: SearchProps) => {
  return (
    <SearchContainer itemProp={display} onSubmit={onSubmit}>
      <SearchInput
        {...register('keyword', { required: true })}
        type="search"
        placeholder={placeholder}
      />
      <SearchIcon type="submit">
        <CustomIcon name="searchIcon" size="17" color={theme.darkGrey} />
      </SearchIcon>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.form`
  position: relative;
  display: ${({ itemProp }) => itemProp};
  width: 40rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 4.5rem;
  padding: 1rem 4rem 1rem 1rem;
  border: 1px solid ${({ theme }) => theme.lightDarkGrey};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

const SearchIcon = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 100%;
  top: 0;
  right: 0;
  border-left: 1px solid ${({ theme }) => theme.lightDarkGrey};
  cursor: pointer;
`;
