import styled from 'styled-components';
import CommentCard from './CommentCard';
import { Comment } from './CommentForm';

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <CommentsContainer>
      {comments.map((comment, index) => (
        <CommentCard comment={comment} key={index} />
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
