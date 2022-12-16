import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import usePrediction from '../../hooks/usePrediction';
import useSetAlert from '../../hooks/useSetAlert';
import { TextTwo } from '../../styles/commonStyle';
import CustomIcon from '../icons/CustomIcon';
import { theme } from '../../styles/theme';
import { imageResize } from '../../util/profileImageResizeUtil';
import ImageSearchResult from './ImageSearchResult';
import { IMAGE_FORMAT } from '../../constants/recipeForm';

interface ModalProps {
  onModalCancelButtonClickEvent: () => void;
}
interface ImageFile {
  imageSearchFile: File[];
}

const ImageSearchModal = ({ onModalCancelButtonClickEvent }: ModalProps) => {
  const [searchImgPreview, setSearchImgPreview] = useState('');
  const { setAlertError } = useSetAlert();
  const { register, handleSubmit, watch } = useForm<ImageFile>({
    mode: 'onChange',
    defaultValues: {
      imageSearchFile: [],
    },
  });
  const { mutate: imagePrediction, isSuccess, data } = usePrediction();
  const result: string = isSuccess && data.result;
  const searchImage = watch('imageSearchFile');

  useEffect(() => {
    (async () => {
      if (searchImage && searchImage.length > 0) {
        const file = searchImage[0];
        if (IMAGE_FORMAT.includes(file.type)) {
          const copress = await imageResize(file);
          setSearchImgPreview(URL.createObjectURL(copress));
        } else {
          setAlertError({ error: 'JPEG, PNG 형식의 이미지를 등록해주세요.' });
          setSearchImgPreview('');
        }
      } else {
        setSearchImgPreview('');
      }
    })();
  }, [searchImage]);

  const handleImageSearch = handleSubmit((data) => imagePrediction(data));

  return (
    <ModalBackDrop>
      <ModalContainer onSubmit={handleImageSearch}>
        {isSuccess ? (
          <ImageSearchResult
            searchImgPreview={searchImgPreview}
            result={result}
            onModalCancelButtonClickEvent={onModalCancelButtonClickEvent}
          />
        ) : (
          <>
            <ModalTitle>이미지 검색</ModalTitle>
            <UploadCotainer>
              <ImageUploadBox>
                <SearchImg itemProp={searchImgPreview} />
                <CustomIcon name="upload" size="60" color={theme.themeColor} />
                <ImgUpload
                  type="file"
                  accept="image/jpeg, image/png"
                  {...register('imageSearchFile', {
                    required: true,
                    validate: {
                      imageFormat: (file) =>
                        IMAGE_FORMAT.includes(file[0].type) ||
                        'JPEG, PNG 형식의 이미지를 등록해주세요.',
                    },
                  })}
                />
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
                  &nbsp;&nbsp;&nbsp;<Highlight>측면에서 촬영</Highlight>한
                  사진을 올려주세요!
                </Text>
              </NoticeContainer>
            </UploadCotainer>
            <ButtonContainer>
              <SearchButton type="submit">Search</SearchButton>
              <CancelButton
                type="button"
                onClick={onModalCancelButtonClickEvent}
              >
                Cancle
              </CancelButton>
            </ButtonContainer>
          </>
        )}
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
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ModalContainer = styled.form`
  ${({ theme }) => theme.fixedCenter};
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 90rem;
  height: 60vh;
  background-image: url('https://images.unsplash.com/photo-1555243896-c709bfa0b564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80');
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  filter: brightness(0.95);
  gap: ${({ theme }) => theme.spacingLargest};
  @media (max-width: ${({ theme }) => theme.bpSmall}) {
    height: 50vh;
  }
`;

const ModalTitle = styled.h2`
  ${({ theme }) =>
    theme.mixins.title(theme.fontLarge, theme.weightSemiBold, theme.mainBlack)}
`;
const UploadCotainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  gap : ${({ theme }) => theme.spacingLarge};
`;
const ImageUploadBox = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  position: relative;
  width: 35rem;
  height: 25rem;
  background-color: ${({ theme }) => theme.lightGrey};
  border: dashed 3px ${({ theme }) => theme.themeColor};
  margin-right: ${({ theme }) => theme.spacingLarge};
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
  width: 40rem;
  height: 25rem;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.bpSmall}) {
    height: 35rem;
    width: 38rem;
  }
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
