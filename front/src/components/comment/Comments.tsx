import styled from 'styled-components';
import CommentCard from './CommentCard';
import { Comment } from '../recipeDetail/RecipeComment';

const Comments = ({
  comments,
  recipeId,
}: {
  comments: Comment[];
  recipeId: string;
}) => {
  return (
    <CommentsContainer>
      {comments.map((comment, index) => (
        <CommentCard comment={comment} key={index} recipeId={recipeId} />
      ))}
    </CommentsContainer>
  );
};
const CommentsContainer = styled.section`
  width: 90%;
  maxheight: 35rem;
  overflow: auto;
`;

export default Comments;
