import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Comments from './Comments';
import useComment from '../../hooks/Comment/useComment';
import { Comment } from '../recipeDetail/RecipeComment';

interface CommentForm {
  recipeId: string;
  comments: Comment[];
}

interface CommentFormInitial {
  comment: string;
}

const CommentForm = ({ recipeId, comments }: CommentForm) => {
  const { mutate: commentMutate } = useComment(recipeId);
  const { register, handleSubmit, reset } = useForm<CommentFormInitial>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(({ comment }) => {
    commentMutate({ recipeId: recipeId, comment });
    reset();
  });

  return (
    <CommentsFormContainer>
      <Comments comments={comments} recipeId={recipeId} />
      <InputForm onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="댓글을 입력해주세요."
          {...register!('comment')}
        />
        <SubitButton type="submit">등록</SubitButton>
      </InputForm>
    </CommentsFormContainer>
  );
};

const CommentsFormContainer = styled.article`
  width: 100%;
  ${({ theme }) => theme.mixins.flexBox('column')};
`;

const InputForm = styled.form`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 100%;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 80%;
  height: 10rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;

const SubitButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;
export default CommentForm;
