import styled from 'styled-components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import imageResize from '../../../util/imageResize';
import CustomIcon from '../../icons/CustomIcon';
import { MediumTitle } from '../../../styles/commonStyle';
import {
  CreateRecipeHeader,
  CreateRecipeInputStyle,
  CreateRecipeImageInput,
  CreateRecipeImageUploadStyle,
  CreateRecipeRemoveButton,
} from '../../../styles/createRecipeStyle';

const CreateRecipeInstruction = () => {
  const { register, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'instructions',
  });

  return (
    <CreateRecipeInstructionContainer>
      <CreateRecipeInstructionHeader>
        <CreateRecipeInstructionTitle>요리순서</CreateRecipeInstructionTitle>
      </CreateRecipeInstructionHeader>
      {fields.map((item, index) => {
        const registeredDesciption = `instructions.${index}.description`;
        const registeredPreview = `instructions.${index}.preview`;
        const registeredImage = `instructions.${index}.image`;
        const preview = watch(registeredPreview);

        return (
          <CreateRecipeInstructionInputContainer key={item.id}>
            <CreateRecipeInstructionInputLabel>
              Step{index + 1}
            </CreateRecipeInstructionInputLabel>
            <CreateRecipeInstructionInput {...register(registeredDesciption)} />
            <CreateRecipeImageUpload preview={preview}>
              <CreateRecipeImageInput
                {...register(registeredImage, { required: true })}
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (e.target.files instanceof FileList) {
                    const uploadImage = e.target.files[0];
                    const compressedUploadImage = await imageResize(
                      uploadImage,
                    );
                    if (compressedUploadImage) {
                      const previewUrl = URL.createObjectURL(
                        compressedUploadImage,
                      );
                      setValue(registeredPreview, previewUrl);
                    }
                  }
                }}
              />
              {preview ? (
                <></>
              ) : (
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
      })}
      <CreateRecipeInstructionAddButton
        type="button"
        onClick={() => {
          append({ description: '' });
        }}
      >
        <CustomIcon name="plusCircle" size="20" /> 순서추가
      </CreateRecipeInstructionAddButton>
    </CreateRecipeInstructionContainer>
  );
};

export default CreateRecipeInstruction;

const CreateRecipeInstructionContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

const CreateRecipeInstructionHeader = styled(CreateRecipeHeader)``;

const CreateRecipeInstructionTitle = styled.h2`
  ${MediumTitle}
  color: ${({ theme }) => theme.mainBlack}
`;

const CreateRecipeInstructionAddButton = styled.button`
  width: auto;
  height: 3rem;
`;

const CreateRecipeImageUpload = styled.div<{ preview: string }>`
  ${CreateRecipeImageUploadStyle};
  ${({ preview }) =>
    preview && `background-image: url(${preview}); background-size: cover;`}
`;

const ImageUploadIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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

const InstructionRemoveButton = styled(CreateRecipeRemoveButton)`
  ${CreateRecipeInstructionInputContainer}:hover & {
    visibility: visible;
  }
`;
