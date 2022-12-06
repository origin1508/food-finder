import styled from 'styled-components';
import { useFormContext, UseFieldArrayRemove } from 'react-hook-form';
import usePreview from '../../../hooks/usePreview';
import LoadingCycle from '../../alert/Loader';
import CustomIcon from '../../icons/CustomIcon';
import { MediumTitle } from '../../../styles/commonStyle';
import {
  CreateRecipeInputStyle,
  CreateRecipeImageInput,
  CreateRecipeImageUploadStyle,
  CreateRecipeRemoveButton,
  ImageUploadIcon,
} from '../../../styles/createRecipeStyle';

const CreateRecipeInstructionInputComponent = ({
  index,
  remove,
}: {
  index: number;
  remove: UseFieldArrayRemove;
}) => {
  const { register, watch, setValue } = useFormContext();
  const { isLoading, createPreview } = usePreview();
  const registeredDesciption = `instructions.${index}.description`;
  const registeredPreview = `instructions.${index}.preview`;
  const registeredImage = `instructions.${index}.image`;
  const preview = watch(registeredPreview);

  return (
    <CreateRecipeInstructionInputContainer>
      <CreateRecipeInstructionInputLabel>
        Step{index + 1}
      </CreateRecipeInstructionInputLabel>
      <CreateRecipeInstructionInput {...register(registeredDesciption)} />
      <CreateRecipeImageUpload preview={preview}>
        {isLoading && <LoadingCycle />}
        <CreateRecipeImageInput
          {...register(registeredImage, { required: true })}
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
      </CreateRecipeImageUpload>
      <InstructionRemoveButton
        top="45%"
        onClick={() => {
          remove(index);
        }}
      >
        <CustomIcon name="remove" size="20" color="white" />
      </InstructionRemoveButton>
    </CreateRecipeInstructionInputContainer>
  );
};

export default CreateRecipeInstructionInputComponent;

const CreateRecipeInstructionInputContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  position: relative;
  width: 80rem;
  padding: 0 ${({ theme }) => theme.spacingLarge};
`;

const CreateRecipeInstructionInputLabel = styled.span`
  ${MediumTitle};
  align-self: flex-start;
  margin-right: ${({ theme }) => theme.spacingRegular};
  color: ${({ theme }) => theme.themeColor};
`;

const CreateRecipeInstructionInput = styled.textarea`
  ${CreateRecipeInputStyle}
  height: 20rem;
`;

const CreateRecipeImageUpload = styled.div<{ preview: string }>`
  ${CreateRecipeImageUploadStyle};
  ${({ preview }) =>
    preview && `background-image: url(${preview}); background-size: cover;`}
`;

const InstructionRemoveButton = styled(CreateRecipeRemoveButton)`
  ${CreateRecipeInstructionInputContainer}:hover & {
    visibility: visible;
  }
`;
