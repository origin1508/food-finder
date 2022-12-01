import styled from 'styled-components';
import { CreateRecipeImgUploadStyle } from '../../../styles/createRecipeStyle';

const CreateRecipeMainRight = () => {
  return (
    <CreateRecipeMainRightContainer>
      <CreateRecipeMainImgInput type="file" accept=".jpg .jpeg" />
      <CreateRecipeMainImgUpload>요리 대표 사진 등록</CreateRecipeMainImgUpload>
    </CreateRecipeMainRightContainer>
  );
};

export default CreateRecipeMainRight;

const CreateRecipeMainRightContainer = styled.div``;

const CreateRecipeMainImgInput = styled.input`
  display: none;
`;

const CreateRecipeMainImgUpload = styled.div`
  ${CreateRecipeImgUploadStyle}
`;
