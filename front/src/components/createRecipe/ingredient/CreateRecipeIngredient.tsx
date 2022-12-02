import styled from 'styled-components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CustomIcon from '../../icons/CustomIcon';
import {
  CreateRecipeHeader,
  CreateRecipeInputStyle,
  CreateRecipeRemoveButton,
} from '../../../styles/createRecipeStyle';
import { MediumTitle } from '../../../styles/commonStyle';

const placeholders = [
  {
    name: '예) 돼지고기',
    amount: '예) 300g',
  },
  {
    name: '예) 양배추',
    amount: '예) 1/2개',
  },
  {
    name: '예) 참기름',
    amount: '예) 2t',
  },
];

const CreateRecipeIngredient = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'ingredients',
  });
  return (
    <CreateRecipeIngredientContainer>
      <CreateRecipeIngredientHeader>
        <CreateRecipeIngredienTitle>재료</CreateRecipeIngredienTitle>
      </CreateRecipeIngredientHeader>
      {fields.map((item, index) => {
        return (
          <CreateRecipeIngredientInputContainer key={item.id}>
            <CreateRecipeIngredientInput
              {...register(`ingredients.${index}.name`)}
              placeholder={placeholders[index % 3].name}
            />
            <CreateRecipeIngredientInput
              {...register(`ingredients.${index}.amount`)}
              placeholder={placeholders[index % 3].amount}
            />
            <IngredientRemoveButton
              top="25%"
              type="button"
              onClick={() => {
                remove(index);
              }}
            >
              <CustomIcon name="remove" size="20" color="white" />
            </IngredientRemoveButton>
          </CreateRecipeIngredientInputContainer>
        );
      })}
      <IngredientAddButton
        type="button"
        onClick={() => {
          append({ name: '', amount: '' });
        }}
      >
        <CustomIcon name="plusCircle" size="20" /> 추가
      </IngredientAddButton>
    </CreateRecipeIngredientContainer>
  );
};

export default CreateRecipeIngredient;

const CreateRecipeIngredientContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

const CreateRecipeIngredientHeader = styled(CreateRecipeHeader)``;

const CreateRecipeIngredienTitle = styled.h2`
  ${MediumTitle}
  color: ${({ theme }) => theme.mainBlack}
`;

const CreateRecipeIngredientInputContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  position: relative;
  width: 65rem;
  padding: 0 ${({ theme }) => theme.spacingLarge};
  gap: ${({ theme }) => theme.spacingMedium};
`;

const CreateRecipeIngredientInput = styled.input`
  ${CreateRecipeInputStyle}
`;

const IngredientRemoveButton = styled(CreateRecipeRemoveButton)`
  ${CreateRecipeIngredientInputContainer}:hover & {
    visibility: visible;
  }
`;

const IngredientAddButton = styled.button``;
