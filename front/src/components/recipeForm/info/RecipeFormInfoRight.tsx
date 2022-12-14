import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import usePreview from '../../../hooks/usePreview';
import LoadingCycle from '../../alert/Loader';
import CustomIcon from '../../icons/CustomIcon';
import {
  RecipeFormImageInput,
  RecipeFormImageUploadStyle,
  ImageUploadIcon,
} from '../../../styles/recipeFormStyle';
import { RecipeFormDefaultValue } from '../../../types/recipe/recipeFormType';

const RecipeFormInfoRight = () => {
  const { isLoading, createPreview } = usePreview();
  const { register, watch, setValue } =
    useFormContext<RecipeFormDefaultValue>();
  const previewUrl = watch('mainImage.preview');

  return (
    <RecipeFormInfoRightContainer>
      <RecipeFormInfoImageUpload previewUrl={previewUrl}>
        {isLoading && <LoadingCycle />}
        <RecipeFormImageInput
          {...register('mainImage.files')}
          type="file"
          accept="image/jpeg, image/png"
          onChange={async (e) => {
            const previewUrl = await createPreview(e);
            previewUrl && setValue('mainImage.preview', previewUrl);
          }}
        />
        {!previewUrl && (
          <ImageUploadIcon>
            <CustomIcon name="imageUpload" size="40" color="grey" />
            요리 대표 사진 등록
          </ImageUploadIcon>
        )}
      </RecipeFormInfoImageUpload>
    </RecipeFormInfoRightContainer>
  );
};

export default RecipeFormInfoRight;

const RecipeFormInfoRightContainer = styled.section``;

const RecipeFormInfoImageUpload = styled.div<{
  previewUrl: string | undefined;
}>`
  ${RecipeFormImageUploadStyle}
  ${({ previewUrl }) =>
    previewUrl &&
    `background-image: url(${previewUrl}); background-size: cover; background-position: center;`}
`;
