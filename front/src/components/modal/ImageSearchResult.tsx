import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ImageSearchResultProps {
  searchImgPreview: string;
  result: string;
  onModalCancelButtonClickEvent: () => void;
}

const ImageSearchResult = ({
  searchImgPreview,
  result,
  onModalCancelButtonClickEvent,
}: ImageSearchResultProps) => {
  const navigate = useNavigate();
  return (
    <ImageSearchResultContainer>
      <ImageSearchResultTitle>이미지 추론 결과</ImageSearchResultTitle>
      <ImagePreview imageUrl={searchImgPreview} />
      <ImageSearchResultText>Result: {result}</ImageSearchResultText>
      <ImageSearchResultButtonContainer>
        <SearchButton
          type="button"
          onClick={() => {
            navigate({
              pathname: '/search',
              search: `?keyword=${result}`,
            });
          }}
        >
          레시피 검색
        </SearchButton>
        <CancelButton type="button" onClick={onModalCancelButtonClickEvent}>
          Cancle
        </CancelButton>
      </ImageSearchResultButtonContainer>
    </ImageSearchResultContainer>
  );
};

export default ImageSearchResult;

const ImageSearchResultContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  height: 100%;
  padding: 5rem;
  gap: ${({ theme }) => theme.spacingMedium};
  transition: all 1s;
`;

const ImageSearchResultTitle = styled.h2`
  ${({ theme }) =>
    theme.mixins.title(theme.fontLarge, theme.weightSemiBold, theme.mainBlack)}
`;

const ImageSearchResultButtonContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  gap: ${({ theme }) => theme.spacingMedium};
`;

const ImageSearchResultText = styled.span`
  ${({ theme }) =>
    theme.mixins.title(theme.fontMedium, theme.weightSemiBold, theme.mainBlack)}
  padding-left: ${({ theme }) => theme.spacingLarge};
`;

const ImagePreview = styled.div<{ imageUrl: string }>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40%;
  height: 60%;

  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const CancelButton = styled.button`
  ${({ theme }) =>
    theme.mixins.mediumButton(
      theme.mainWhite,
      theme.mainBlack,
      `1px solid ${theme.themeColor}`,
    )}
`;

const SearchButton = styled.button`
  ${({ theme }) => theme.mixins.mediumButton()}
`;
