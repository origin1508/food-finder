import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { MediumTitle, TextTwo } from '../../styles/commonStyle';
import CustomIcon from '../icons/CustomIcon';
import { theme } from '../../styles/theme';
import { imageResize } from '../../util/profileImageResizeUtil';

interface ModalProps {
  onModalCancelButtonClickEvent: () => void;
}
interface ImageFile {
  imageSearchFile: File[];
}

const ImageSearchModal = ({ onModalCancelButtonClickEvent }: ModalProps) => {
  const [searchImgPreview, setSearchImgPreview] = useState('');
  const { register, handleSubmit, watch } = useForm<ImageFile>({
    mode: 'onChange',
    defaultValues: {
      imageSearchFile: [],
    },
  });

  const searchImage = watch('imageSearchFile');

  useEffect(() => {
    (async () => {
      if (searchImage && searchImage.length > 0) {
        const file = searchImage[0];
        const copress = await imageResize(file);
        setSearchImgPreview(URL.createObjectURL(copress));
      }
    })();
  }, [searchImage]);

  return (
    <ModalBackDrop>
      <ModalContainer>
        <ModalTitle>이미지 검색</ModalTitle>
        <UploadCotainer>
          <ImageUploadBox>
            <SearchImg itemProp={searchImgPreview} />
            <CustomIcon name="upload" size="60" color={theme.themeColor} />
            <ImgUpload type="file" {...register('imageSearchFile')} />
          </ImageUploadBox>
          <NoticeContainer>
            <NoticeTitle>검색 정확도를 위한 유의사항!</NoticeTitle>
            <Text>
              1. 업로드 하는 사진 속에 &nbsp;
              <Highlight>검색하고자 하는 음식 외에</Highlight>
              <br />
              &nbsp;&nbsp;&nbsp;<Highlight>다른 음식이 보이면</Highlight>
              &nbsp;정확도가 떨어질 수 있습니다!
              <br />
            </Text>
            <Text>
              2. 음식을 객체를{' '}
              <Highlight>직각 (Top View) 또는 45도 가량의</Highlight>
              <br />
              &nbsp;&nbsp;&nbsp;<Highlight>측면에서 촬영</Highlight>한 사진을
              올려주세요!
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
  background-image: url('https://cdn.pixabay.com/photo/2017/10/22/21/01/wood-2879254_1280.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  filter: brightness(110%);
  gap: ${({ theme }) => theme.spacingLargest};
`;

const ModalTitle = styled.h2`
  ${({ theme }) =>
    theme.mixins.title(theme.fontLarge, theme.weightSemiBold, theme.mainBlack)}
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
  background-color: ${({ theme }) => theme.lightGrey};
  border: dashed 3px ${({ theme }) => theme.themeColor};
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
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'space-between')}
  width: 35rem;
  height: 25rem;
  overflow: hidden;
`;
const NoticeTitle = styled.h3`
  ${({ theme }) =>
    theme.mixins.title(theme.fontSemiMedium, theme.weightBold, theme.mainBlack)}
  margin-bottom: ${({ theme }) => theme.spacingRegular};
`;

const Text = styled.p`
  ${TextTwo}
`;
const Highlight = styled.span`
  font-weight: ${({ theme }) => theme.weightSemiBold};
`;
const SearchImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${({ itemProp }) =>
    itemProp !== '' ? `url(${itemProp})` : 'none'};
  background-size: cover;
  background-position: center;
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
