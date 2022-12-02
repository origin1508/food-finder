import { useRef } from 'react';
import styled from 'styled-components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CustomIcon from '../../icons/CustomIcon';
import { MediumTitle } from '../../../styles/commonStyle';
import {
  CreateRecipeHeader,
  CreateRecipeInputStyle,
} from '../../../styles/createRecipeStyle';

const CreateRecipeInstruction = () => {
  const fileInput = useRef<HTMLInputElement>();
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instruction',
  });

  return (
    <CreateRecipeInstructionContainer>
      <CreateRecipeInstructionHeader>
        <CreateRecipeInstructionTitle>요리순서</CreateRecipeInstructionTitle>
      </CreateRecipeInstructionHeader>
      {fields.map((item, index) => {
        const { ref } = register(`instruction.${index}.image`);
        return (
          <CreateRecipeInstructionInputContainer key={item.id}>
            <CreateRecipeInstructionImgInput
              {...register(`instruction.${index}.image`, { required: true })}
              type="file"
              accept="image/*"
              ref={(el) => {
                if (!el) return;
                ref(el);
                fileInput.current = el;
              }}
            />

            <CreateRecipeInstructionInputTitle>
              Step{index + 1}
            </CreateRecipeInstructionInputTitle>
            <CreateRecipeInstructionInput
              {...register(`instruction.${index}.description`)}
            />
            <ImageUploadButton
              onClick={() => {
                fileInput.current && fileInput.current.click();
              }}
            >
              {<CustomIcon name="plus" size="32" color="black" />}
            </ImageUploadButton>
          </CreateRecipeInstructionInputContainer>
        );
      })}
      <CreateRecipeInstructionAddButton
        type="button"
        onClick={() => {
          append({ step: fields.length + 1, description: '' });
        }}
      >
        {<CustomIcon name="plusCircle" size="20" />} 순서추가
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

const CreateRecipeInstructionImgInput = styled.input`
  display: none;
`;

const CreateRecipeInstructionInputContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 80rem;
`;

const CreateRecipeInstructionInputTitle = styled.p`
  ${MediumTitle};
  align-self: flex-start;
  margin-right: ${({ theme }) => theme.spacingRegular};
  color: ${({ theme }) => theme.themeColor};
`;

const CreateRecipeInstructionInput = styled.textarea`
  ${CreateRecipeInputStyle}
  height: 20rem;
`;

const ImageUploadButton = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  flex-shrink: 0;
  width: 20rem;
  height: 20rem;
  margin-bottom: ${({ theme }) => theme.spacingRegular};
  margin-left: ${({ theme }) => theme.spacingRegular};
  border-radius: 0.5rem;
  box-shadow: inset 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
  background-color: ${({ theme }) => theme.lightGrey};
  cursor: pointer;
`;
