import styled, { css } from 'styled-components';
import { MediumTitle, TextTwo } from '../../styles/commonStyle';
import CustomIcon from '../icons/CustomIcon';
import { theme } from '../../styles/theme';

interface ModalProps {
  onModalCancelButtonClickEvent: () => void;
}

const ImageSearchModal = ({ onModalCancelButtonClickEvent }: ModalProps) => {
  return (
    <ModalBackDrop>
      <ModalContainer>
        <ModalTitle>이미지 검색</ModalTitle>
        <UploadCotainer>
          <ImageUploadBox>
            <CustomIcon
              name="upload"
              size="60"
              color={theme.themeColor}
            ></CustomIcon>
            <ImgUpload type="file" accept="image/*" name="file" />
          </ImageUploadBox>
          <NoticeContainer>
            <NoticeTitle>유의사항!</NoticeTitle>
            <Text>
              1. asldkjalskjdlaksdjlasdjlkasjdasldkjalskdjlkaslkdj
              <br />
              alksdjalsjdaslkjdalksjdlkasdjlasdjklasdasdasdasdasd
              <br />
              lskjdlaksdjlasdkjlaksdjalksdjalsdjkaldjkals.
            </Text>
            <Text>
              2. asldkjalskjdlaksdjlasdjlkasjdasldkjalskdjlkaslkdj
              <br />
              alksdjalsjdaslkjdalksjdlkasdjlasdjklasdasdasdasdasd
              <br />
              lskjdlaksdjlasdkjlaksdjalksdjalsdjkaldjkals.
            </Text>
          </NoticeContainer>
        </UploadCotainer>
        <ButtonContainer>
          <SearchButton>Search</SearchButton>
          <CancelButton onClick={onModalCancelButtonClickEvent}>
            Cancle
          </CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackDrop>
  );
};

const ModalBackDrop = styled.article`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ModalContainer = styled.div`
  ${({ theme }) => theme.fixedCenter};
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 60%;
  height: 70vh;
  background-color: ${({ theme }) => theme.mainWhite};
  border-radius: 1rem;
  gap: ${({ theme }) => theme.spacingLargest};
`;

const ModalTitle = styled.h2`
  ${MediumTitle}
  font-weight:${({ theme }) => theme.weightRegular};
  color: ${({ theme }) => theme.themeColor};
`;
const UploadCotainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  gap : ${({ theme }) => theme.spacingLarge};
`;
const ImageUploadBox = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  position: relative;
  width: 35rem;
  height: 25rem;
  background-color: ${({ theme }) => theme.lightDarkGrey};
  border: dashed 2px ${({ theme }) => theme.themeColor};
`;

const ImgUpload = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;

const NoticeContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'start')}
  width: 35rem;
  height: 25rem;
  overflow: hidden;
`;
const NoticeTitle = styled.h3`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightSemiBold,
      theme.mainBlack,
    )}
  margin-bottom: ${({ theme }) => theme.spacingRegular};
`;

const Text = styled.div`
  ${TextTwo}
  margin-bottom: ${({ theme }) => theme.spacingRegular};
`;

const ButtonContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  gap : ${({ theme }) => theme.spacingMedium};
`;

const SearchButton = styled.button`
  ${({ theme }) => theme.mixins.mediumButton()}
`;

const CancelButton = styled.button`
  ${({ theme }) =>
    theme.mixins.mediumButton(
      theme.mainWhite,
      theme.mainBlack,
      `1px solid ${theme.themeColor}`,
    )}
`;
export default ImageSearchModal;
