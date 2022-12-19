import styled from 'styled-components';
import CustomIcon from '../icons/CustomIcon';
import { theme } from '../../styles/theme';
import useModal from '../../hooks/useModal';
import ImageSearchModal from '../modal/imageSearchModal';

const ImageSearch = () => {
  const [isOpenModal, handleModalOpenButtonClick, handleModalCloseButtonClick] =
    useModal(false);
  return (
    <>
      <SearchContainer onClick={handleModalOpenButtonClick}>
        <SearchInput>사진검색</SearchInput>
        <SearchIcon>
          <CustomIcon name="upload" size="17" color={theme.darkGrey} />
        </SearchIcon>
      </SearchContainer>
      {isOpenModal && (
        <ImageSearchModal
          onModalCancelButtonClickEvent={handleModalCloseButtonClick}
        />
      )}
    </>
  );
};

export default ImageSearch;

const SearchContainer = styled.div`
  position: relative;
  width: 10rem;
  cursor: pointer;
`;

const SearchInput = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  width: 100%;
  height: 4.5rem;
  font-size: ${({ theme }) => theme.fontSmall};
  color: ${({ theme }) => theme.darkGrey};
  padding: 1rem 4rem 1rem 1rem;
  border: 1px solid ${({ theme }) => theme.lightDarkGrey};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};

  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    width: 12rem;
    padding: 1rem 5rem 1rem 1rem;
  }

  @media (max-width: ${({ theme }) => theme.bpSmallest}) {
    height: 6rem;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  ${({ theme }) => theme.mixins.flexBox()}
  width: 3rem;
  height: 100%;
  top: 0;
  right: 0;
  border-left: 1px solid ${({ theme }) => theme.lightDarkGrey};
  cursor: pointer;
`;
