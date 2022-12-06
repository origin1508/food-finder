import { useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import usePreview from '../../../hooks/usePreview';
import LoadingCycle from '../../alert/Loader';
import CustomIcon from '../../icons/CustomIcon';
import {
  CreateRecipeImageInput,
  CreateRecipeImageUploadStyle,
  ImageUploadIcon,
} from '../../../styles/createRecipeStyle';
import { IMAGE_FORMAT } from '../../../constants/createRecipe';
const CreateRecipeInfoRight = () => {
  const [previewUrl, setPreviewUrl] = useState('');
  const { isLoading, createPreview } = usePreview();
  const { register } = useFormContext();

  return (
    <CreateRecipeInfoRightContainer>
      <CreateRecipeInfoImageUpload previewUrl={previewUrl}>
        {isLoading && <LoadingCycle />}
        <CreateRecipeImageInput
          {...register('mainImage', {
            required: { value: true, message: '요리 대표 사진을 등록해주세요' },
            validate: {
              acceptedFormat: (files) => IMAGE_FORMAT.includes(files[0].type),
            },
          })}
          type="file"
          accept="image/jpeg, image/png"
          onChange={async (e) => {
            const previewUrl = await createPreview(e);
            previewUrl && setPreviewUrl(previewUrl);
          }}
        />
        {!previewUrl && (
          <ImageUploadIcon>
            <CustomIcon name="imageUpload" size="40" color="grey" />
            요리 대표 사진 등록
          </ImageUploadIcon>
        )}
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
