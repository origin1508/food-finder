import { useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import CustomIcon from '../../icons/CustomIcon';
import {
  CreateRecipeImageInput,
  CreateRecipeImageUploadStyle,
} from '../../../styles/createRecipeStyle';

const CreateRecipeInfoRight = () => {
  const [previewUrl, setPreviewUrl] = useState('');
  const { register } = useFormContext();
  return (
    <CreateRecipeInfoRightContainer>
      <CreateRecipeInfoImageUpload previewUrl={previewUrl}>
        <CreateRecipeImageInput
          {...register('mainImage', { required: true })}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files instanceof FileList) {
              const uploadImage = e.target.files[0];
              const previewUrl = URL.createObjectURL(uploadImage);
              setPreviewUrl(previewUrl);
            }
          }}
        />
        <ImageUploadIcon>
          <CustomIcon name="imageUpload" size="40" color="grey" />
          요리 대표 사진 등록
        </ImageUploadIcon>
      </CreateRecipeInfoImageUpload>
    </CreateRecipeInfoRightContainer>
  );
};

export default CreateRecipeInfoRight;

const CreateRecipeInfoRightContainer = styled.section``;

const CreateRecipeInfoImageUpload = styled.div<{
  previewUrl: string | undefined;
}>`
  ${CreateRecipeImageUploadStyle}
  ${({ previewUrl }) =>
    previewUrl &&
    `background-image: url(${previewUrl}); background-size: cover;`}
`;

const ImageUploadIcon = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  height: 100%;
  gap: ${({ theme }) => theme.spacingRegular};
  color: ${({ theme }) => theme.darkGrey};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
