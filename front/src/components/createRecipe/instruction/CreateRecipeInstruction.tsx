import { useRef } from 'react';
import styled from 'styled-components';
import CreateRecipeInstructionInputComponent from './CreateRecipeInstructionInputComponent';
import CustomIcon from '../../icons/CustomIcon';
import { MediumTitle } from '../../../styles/commonStyle';
import { CreateRecipeHeader } from '../../../styles/createRecipeStyle';

const CreateRecipeInstruction = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <CreateRecipeInstructionContainer>
      <CreateRecipeInstructionHeader>
        <CreateRecipeInstructionTitle>요리순서</CreateRecipeInstructionTitle>
      </CreateRecipeInstructionHeader>
      <CreateRecipeInstructionImgInput
        type="file"
        accept=".jpg .jpeg"
        ref={fileInput}
      />
      <CreateRecipeInstructionInputComponent fileInput={fileInput} />
      <CreateRecipeInstructionAddButton type="button">
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
