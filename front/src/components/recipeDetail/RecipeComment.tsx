import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import {
  RecipeDetailContainerStyle,
  RecipeDetailHeader,
  RecipeDetailTitleStyle,
  RecipeDetailSubTitleStyle,
} from '../../styles/recipeDetailStyle';
import CommentForm from '../comment/CommentForm';

export interface Comment {
  User: {
    nickname: string;
    userId: number;
    profileUrl: string;
  };
  content: string;
}

interface CommentFormInitial {
  comment: string;
}

const RecipeComment = ({
  comments,
  recipeId,
}: {
  comments: Comment[];
  recipeId: string;
}) => {
  const methods = useForm<CommentFormInitial>({
    mode: 'onChange',
  });
  return (
    <RecipeCommnetsContainer>
      <RecipeCommentHeadr>
        <Title>후기 댓글</Title>
        <SubTitle>{comments.length}</SubTitle>
      </RecipeCommentHeadr>
      <FormProvider {...methods}>
        <CommentForm recipeId={recipeId!} comments={comments} />
      </FormProvider>
    </RecipeCommnetsContainer>
  );
};

const RecipeCommnetsContainer = styled.section`
  ${RecipeDetailContainerStyle}
`;

const RecipeCommentHeadr = styled.header`
  ${RecipeDetailHeader};
`;

const Title = styled.h2`
  ${RecipeDetailTitleStyle}
`;
const SubTitle = styled.h4`
  ${RecipeDetailSubTitleStyle}
`;

const Steps = styled.ul`
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-between')}
  flex-wrap:wrap;
  width: 80rem;
  gap: ${({ theme }) => theme.spacingLargest};
`;
const Step = styled.li`
  ${({ theme }) => theme.mixins.flexBox('row', 'start', 'space-between')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingRegular};
  border-bottom: 1px solid ${({ theme }) => theme.lightDarkGrey};
`;

const StepNum = styled.span`
  ${({ theme }) =>
    theme.mixins.title(theme.fontLarge, theme.weightRegular, theme.mainBlack)}
`;

const StepText = styled.p`
  max-width: 40%;
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightRegular,
      theme.darkGrey,
    )}
  line-height: 1.7;
`;

const StepImage = styled.div`
  width: 30rem;
  height: 20rem;
  background-image: ${({ itemProp }) => `url(${itemProp})`};
  background-size: cover;
  background-position: center;
`;
export default RecipeComment;
