import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { CreateRecipeInputStyle } from '../../../styles/createRecipeStyle';
import {
  SERVING_OPTIONS,
  CATEGORY_OPTIONS,
  METHOD_OPTIONS,
} from '../../../constants/createRecipe';

const CreateRecipeInfoLeft = () => {
  const { register } = useFormContext();

  return (
    <CreateRecipeInfoLeftContainer>
      <CreateRecipeInfoInputContainer>
        <CreateRecipeInfoInputLabel>레시피 제목</CreateRecipeInfoInputLabel>
        <CreateRecipeInfoInput
          {...register('name', { required: true })}
          placeholder="예) 소고기 미역국"
        />
      </CreateRecipeInfoInputContainer>
      <CreateRecipeInfoInputContainer>
        <CreateRecipeInfoInputLabel>요리 정보</CreateRecipeInfoInputLabel>
        <CreateRecipeSelect {...register('serving', { required: true })}>
          <CreateRecipeOption value="" hidden>
            인원
          </CreateRecipeOption>
          {SERVING_OPTIONS.map((serving) => (
            <CreateRecipeOption key={serving}>{serving}</CreateRecipeOption>
          ))}
        </CreateRecipeSelect>
        <CreateRecipeInfoInput
          {...register('cookingTime', { required: true })}
          placeholder="조리시간"
        />
      </CreateRecipeInfoInputContainer>
      <CreateRecipeInfoSelectContainer>
        <CreateRecipeInfoInputLabel>카테고리</CreateRecipeInfoInputLabel>
        <CreateRecipeSelect {...register('category', { required: true })}>
          <CreateRecipeOption value="" hidden>
            분류별
          </CreateRecipeOption>
          {CATEGORY_OPTIONS.map((category) => (
            <CreateRecipeOption key={category}>{category}</CreateRecipeOption>
          ))}
        </CreateRecipeSelect>
        <CreateRecipeSelect {...register('method', { required: true })}>
          <CreateRecipeOption value="" hidden>
            조리방법별
          </CreateRecipeOption>
          {METHOD_OPTIONS.map((method) => (
            <CreateRecipeOption key={method}>{method}</CreateRecipeOption>
          ))}
        </CreateRecipeSelect>
      </CreateRecipeInfoSelectContainer>
    </CreateRecipeInfoLeftContainer>
  );
};

export default CreateRecipeInfoLeft;

const CreateRecipeInfoLeftContainer = styled.section`
  width: 60%;
`;

const CreateRecipeInfoInputContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacingMedium};
`;

const CreateRecipeInfoInput = styled.input`
  ${CreateRecipeInputStyle}
  margin: 0 ${({ theme }) => theme.spacingRegular};
`;

const CreateRecipeInfoInputLabel = styled.span`
  flex-shrink: 0;
  width: 16rem;
  font-size: 2.25rem;
`;

const CreateRecipeInfoSelectContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
`;

const CreateRecipeSelect = styled.select`
  ${CreateRecipeInputStyle}
  margin: 0 ${({ theme }) => theme.spacingRegular};
`;

const CreateRecipeOption = styled.option``;
