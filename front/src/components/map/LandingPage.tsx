import { useState } from 'react';
import Map from './Map';
import BasePageComponent from '../../hoc/BasePageComponent';
import styled from 'styled-components';
import CustomIcon from '../icons/CustomIcon';
import { theme } from '../../styles/theme';

export interface propsType {
  searchKeyword: string;
}

const LandingPage = (): JSX.Element => {
  // 입력 폼 변화 감지하여 입력 값 관리
  const [Value, setValue] = useState('');
  // 제출한 검색어 관리
  const [Keyword, setKeyword] = useState('강남 김치찌개 맛집');

  // 입력 폼 변화 감지하여 입력 값을 state에 담아주는 함수
  const keywordChange = (e: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // 제출한 검색어 state에 담아주는 함수
  const submitKeyword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setKeyword(Value);
  };

  // 검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
  const valueChecker = () => {
    if (Value === '') {
      alert('검색어를 입력해주세요.');
    }
  };

  return (
    <BasePageComponent>
      <LandingPageContainer>
        <SerachForm onSubmit={submitKeyword}>
          <SearchContainer htmlFor="place" className="form__label">
            <Input
              type="text"
              id="movie-title"
              className="form__input"
              name="place"
              onChange={keywordChange}
              placeholder="검색어를 입력해주세요. (ex: 강남 맛집)"
              required
            />
            <SearchIcon type="submit" onClick={valueChecker}>
              <CustomIcon name="searchIcon" size="17" color={theme.darkGrey} />
            </SearchIcon>
          </SearchContainer>
        </SerachForm>

        {/* 제출한 검색어 넘기기 */}
        <Map searchKeyword={Keyword} />
      </LandingPageContainer>
    </BasePageComponent>
  );
};

const LandingPageContainer = styled.article`
  position: relative;
  height: 60rem;
  width: 120rem;
`;

const SerachForm = styled.form`
  ${({ theme }) => theme.mixins.flexBox()}
  position: absolute;
  top: 2%;
  left: 7%;
  z-index: 2;
`;

const SearchContainer = styled.label`
  position: relative;
  display: ${({ itemProp }) => itemProp};
  width: 28rem;
`;
const Input = styled.input`
width: 100%;
height: 4.5rem;
padding: 1rem 4rem 1rem 1rem;
border: 1px solid ${({ theme }) => theme.lightDarkGrey};
border-radius: 0.5rem;
background-color: ${({ theme }) => theme.mainWhite};

&::-webkit-search-decoration,
&::-webkit-search-cancel-button,
&::-webkit-search-results-button,
&::-webkit-search-results-decoration{
  display: none;
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
export default LandingPage;
