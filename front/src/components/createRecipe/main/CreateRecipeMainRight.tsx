import { useRef } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import CustomIcon from '../../icons/CustomIcon';
import { CreateRecipeImgUploadStyle } from '../../../styles/createRecipeStyle';

const CreateRecipeMainRight = () => {
  const fileInput = useRef<HTMLInputElement>();
  const { register } = useFormContext();
  const { ref } = register('mainImg');
  return (
    <CreateRecipeMainRightContainer>
      <CreateRecipeMainImgInput
        {...register('mainImg', { required: true })}
        type="file"
        accept="image/*"
        ref={(el) => {
          if (!el) return;
          ref(el);
          fileInput.current = el;
        }}
      />
      <CreateRecipeMainImgUpload
        onClick={() => {
          fileInput.current && fileInput.current.click();
        }}
      >
        <ImgPreview />
        <CustomIcon name="imageUpload" size="50" color="grey" />
        요리 대표 사진 등록
      </CreateRecipeMainImgUpload>
    </CreateRecipeMainRightContainer>
  );
};

export default CreateRecipeMainRight;

const CreateRecipeMainRightContainer = styled.section``;

const CreateRecipeMainImgInput = styled.input`
  display: none;
`;

const CreateRecipeMainImgUpload = styled.div`
  ${CreateRecipeImgUploadStyle}
  ${({ theme }) => theme.mixins.flexBox('column')};
  position: relative;
  color: ${({ theme }) => theme.darkGrey};
  gap: ${({ theme }) => theme.spacingRegular};
`;

const ImgPreview = styled.div`
  display: none;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
`;
