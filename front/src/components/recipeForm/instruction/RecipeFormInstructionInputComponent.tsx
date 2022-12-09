import styled from 'styled-components';
import { useFormContext, UseFieldArrayRemove } from 'react-hook-form';
import usePreview from '../../../hooks/usePreview';
import LoadingCycle from '../../alert/Loader';
import CustomIcon from '../../icons/CustomIcon';
import { MediumTitle } from '../../../styles/commonStyle';
import {
  RecipeFormInputStyle,
  RecipeFormImageInput,
  RecipeFormImageUploadStyle,
  RecipeFormRemoveButton,
  ImageUploadIcon,
} from '../../../styles/recipeFormStyle';

const RecipeFormInstructionInputComponent = ({
  index,
  remove,
}: {
  index: number;
  remove: UseFieldArrayRemove;
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { isLoading, createPreview } = usePreview();
  const registeredDesciption = `instructions.${index}.description`;
  const registeredPreview = `instructions.${index}.preview`;
  const registeredImage = `instructions.${index}.image`;
  const preview = watch(registeredPreview);

  return (
    <RecipeFormInstructionInputContainer>
      <RecipeFormInstructionInputLabel>
        Step{index + 1}
      </RecipeFormInstructionInputLabel>
      <RecipeFormInstructionInput
        {...register(registeredDesciption, {
          required: '요리순서를 작성해주세요.',
        })}
      />
      <RecipeFormImageUpload preview={preview}>
        {isLoading && <LoadingCycle />}
        <RecipeFormImageInput
          {...register(registeredImage, {
            required: '요리순서 사진을 등록해주세요.',
          })}
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const previewUrl = await createPreview(e);
            previewUrl && setValue(registeredPreview, previewUrl);
          }}
        />
        {!preview && (
          <ImageUploadIcon>
            <CustomIcon name="plus" size="32" color="black" />
          </ImageUploadIcon>
        )}
      </RecipeFormImageUpload>
      <InstructionRemoveButton
        top="45%"
        onClick={() => {
          remove(index);
        }}
      >
        <CustomIcon name="remove" size="20" color="white" />
      </InstructionRemoveButton>
    </RecipeFormInstructionInputContainer>
  );
};

export default RecipeFormInstructionInputComponent;

const RecipeFormInstructionInputContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  position: relative;
  width: 80rem;
  padding: 0 ${({ theme }) => theme.spacingLarge};
`;

const RecipeFormInstructionInputLabel = styled.span`
  ${MediumTitle};
  align-self: flex-start;
  margin-right: ${({ theme }) => theme.spacingRegular};
  color: ${({ theme }) => theme.themeColor};
`;

const RecipeFormInstructionInput = styled.textarea`
  ${RecipeFormInputStyle}
  height: 20rem;
`;

const RecipeFormImageUpload = styled.div<{ preview: string }>`
  ${RecipeFormImageUploadStyle};
  ${({ preview }) =>
    preview && `background-image: url(${preview}); background-size: cover;`}
`;

const InstructionRemoveButton = styled(RecipeFormRemoveButton)`
  ${RecipeFormInstructionInputContainer}:hover & {
    visibility: visible;
  }
`;
