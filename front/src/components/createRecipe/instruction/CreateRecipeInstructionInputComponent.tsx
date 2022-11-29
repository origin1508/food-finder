import styled from 'styled-components';
import CustomIcon from '../../icons/CustomIcon';
import { CreateRecipeInputStyle } from '../../../styles/createRecipeStyle';
import { MediumTitle } from '../../../styles/commonStyle';

interface CreateRecipeInstructionProps {
  fileInput: React.RefObject<HTMLInputElement>;
}

const CreateRecipeInstructionInputComponent = ({
  fileInput,
}: CreateRecipeInstructionProps) => {
  return (
    <CreateRecipeInstructionInputContainer>
      <CreateRecipeInstructionInputTitle>
        Step1
      </CreateRecipeInstructionInputTitle>
      <CreateRecipeInstructionInput />
      <ImageUploadButton
        onClick={() => {
          fileInput.current && fileInput.current.click();
        }}
      >
        {<CustomIcon name="plus" size="32" color="black" />}
      </ImageUploadButton>
    </CreateRecipeInstructionInputContainer>
  );
};

export default CreateRecipeInstructionInputComponent;

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
