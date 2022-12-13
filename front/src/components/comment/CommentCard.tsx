import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MdDelete, MdCreate } from 'react-icons/md';
import CommentEdit from './CommentEdit';
import useModal from '../../hooks/useModal';
import ConfirmModal from '../modal/ConfirmModal';
import { authState } from '../../atom/auth';
import { Comment } from '../recipeDetail/RecipeComment';
import { SmallTitle, SmallSubTitle } from '../../styles/commonStyle';
import { theme } from '../../styles/theme';
import useDeleteComment from '../../hooks/Comment/useDeleteComment';

const ContentCard = ({
  comment,
  recipeId,
}: {
  comment: Comment;
  recipeId: string;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const { mutate } = useDeleteComment(recipeId);
  const user = useRecoilValue(authState);
  const loginId = user?.userId;
  const commentId = comment.commentId;
  const [isOpenModal, handleModalOpenButtonClick, handleModalCloseButtonClick] =
    useModal(false);
  const navigate = useNavigate();

  const handleClickImage = () => {
    const path = `/profile/${comment.User.userId}`;
    navigate(path);
  };

  const handleClickDeleteButton = () => {
    mutate({ commentId });
    handleModalCloseButtonClick();
  };

  return (
    <CardItemBlock>
      <CommentWrap>
        {!isEdit ? (
          <ContentCotainer>
            <UserImg src={comment.User.profileUrl} onClick={handleClickImage} />
            <CommentInfoContainer>
              <UserNickname>{comment.User.nickname}</UserNickname>
              <CommentContent>{comment.content}</CommentContent>
            </CommentInfoContainer>

            {loginId === comment.User.userId && (
              <IconBlock>
                <Edit>
                  <MdCreate
                    size="15"
                    color={theme.darkGrey}
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  />
                </Edit>
                <Remove>
                  <MdDelete
                    onClick={handleModalOpenButtonClick}
                    size="15"
                    color={theme.darkGrey}
                  />
                </Remove>
              </IconBlock>
            )}
          </ContentCotainer>
        ) : (
          <CommentEdit
            comment={comment}
            setIsEdit={setIsEdit}
            recipeId={recipeId}
          />
        )}
      </CommentWrap>
      <ConfirmModal
        isOpenModal={isOpenModal}
        onModalCancelButtonClickEvent={handleModalCloseButtonClick}
        onModalAcceptButtonClickEvent={handleClickDeleteButton}
      >
        해당 댓글을 삭제하시겠습니까?
      </ConfirmModal>
    </CardItemBlock>
  );
};

export default ContentCard;

const CommentWrap = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'start')}
  height: 7rem;
  border-bottom: 1px solid ${({ theme }) => theme.lightDarkGrey};
`;

const ContentCotainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  gap : 2rem;
`;

const CommentInfoContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'start')}
  gap :1rem;
`;

const UserNickname = styled.h3`
  ${SmallTitle}
`;

const CommentContent = styled.p`
  ${SmallSubTitle}
`;

const Edit = styled.div`
  width: fit-content;
  color: #dee2e6;
  margin-right: 5px;
  font-size: 1.2rem;
  &:hover {
    color: #7cd1b8;
  }
`;

const Remove = styled.div`
  width: fit-content;
  color: #dee2e6;
  font-size: 1.2rem;
  &:hover {
    color: #ff6b6b;
  }
`;

const IconBlock = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row', 'end')}
`;

const CardItemBlock = styled.div`
  width: 100%;
`;
const UserImg = styled.img`
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
`;
