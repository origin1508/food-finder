import styled from 'styled-components';
import { useFieldArray } from 'react-hook-form';
import RecipeFormInstructionInputComponent from './RecipeFormInstructionInputComponent';
import CustomIcon from '../../icons/CustomIcon';
import { MediumTitle } from '../../../styles/commonStyle';
import { RecipeFormHeader } from '../../../styles/recipeFormStyle';

const RecipeFormInstruction = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'instructions',
  });

  return (
    <RecipeFormInstructionContainer>
      <RecipeFormInstructionHeader>
        <RecipeFormInstructionTitle>요리순서</RecipeFormInstructionTitle>
      </RecipeFormInstructionHeader>
      {fields.map((item, index) => {
        const { id } = item;
        return (
          <RecipeFormInstructionInputComponent
            key={id}
            index={index}
            remove={remove}
          />
        );
      })}
      <RecipeFormInstructionAddButton
        type="button"
        onClick={() => {
          append({ description: '' });
        }}
      >
        <CustomIcon name="plusCircle" size="20" /> 순서추가
      </RecipeFormInstructionAddButton>
    </RecipeFormInstructionContainer>
  );
};

export default RecipeFormInstruction;

const RecipeFormInstructionContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

const RecipeFormInstructionHeader = styled(RecipeFormHeader)``;

const RecipeFormInstructionTitle = styled.h2`
  ${MediumTitle}
  color: ${({ theme }) => theme.mainBlack}
`;

const RecipeFormInstructionAddButton = styled.button`
  width: auto;
  height: 3rem;
`;
