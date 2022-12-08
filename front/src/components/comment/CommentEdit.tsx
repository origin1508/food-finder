import { useState } from 'react';
import { Comment } from './CommentForm';
import styled from 'styled-components';
// import * as Api from '../../api';

interface CommentEdit {
  comment: Comment;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentEdit = ({ comment, setIsEdit }: CommentEdit) => {
  const [inputs, setInputs] = useState({
    comment: comment.comment,
  });

  //   const editHandler = async (e) => {
  //     e.preventDefault();
  //     await Api.put(`api/comment/${comment.id}`, inputs);

  //     setIsEdit(false);
  //     fetch();
  //   };
  return (
    <InputForm>
      <Input name="comment" defaultValue={comment.comment} as="textarea" />

      <ButtonContainer>
        <SubitButton type="submit">수정</SubitButton>
        <CancleButton type="button" onClick={() => setIsEdit(false)}>
          취소
        </CancleButton>
      </ButtonContainer>
    </InputForm>
  );
};

const InputForm = styled.form`
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'start')};
  gap: 2rem;
  width: 100%;
`;

const Input = styled.input`
  width: 80%;
  height: 5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;
const ButtonContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox}
`;
const SubitButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;
const CancleButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;
export default CommentEdit;
