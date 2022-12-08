import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MdDelete, MdCreate } from 'react-icons/md';
// import * as Api from '../../api';
import CommentEdit from './CommentEdit';
import useModal from '../../hooks/useModal';
import ConfirmModal from '../modal/ConfirmModal';
import { authState } from '../../atom/auth';
import { Comment } from './CommentForm';
import { SmallTitle, SmallSubTitle } from '../../styles/commonStyle';
import { theme } from '../../styles/theme';

const ContentCard = ({ comment }: { comment: Comment }) => {
  const [isEdit, setIsEdit] = useState(false);

  const user = useRecoilValue(authState);
  const loginId = user?.userId;
  const [isOpenModal, handleModalOpenButtonClick, handleModalCloseButtonClick] =
    useModal(false);
  const navigate = useNavigate();

  const handleClickImage = () => {
    const path = `/profile/${comment.writerUser.id}`;
    navigate(path);
  };

  //   const handleDeleteComment = async () => {
  //     await Api.delete('api/comment', comment._id);
  //     fetch();
  //   };

  return (
    <CardItemBlock>
      <CommentWrap>
        {!isEdit ? (
          <ContentCotainer>
            <UserImg
              src={comment.writerUser.imageUrl}
              onClick={handleClickImage}
            />
            <CommentInfoContainer>
              <UserNickname>{comment.writerUser.name}</UserNickname>
              <CommentContent>{comment.comment}</CommentContent>
            </CommentInfoContainer>
            {/* 자신이 쓴 댓글만 수정, 삭제 할 수 있도록 조건부 렌더링 */}
            {loginId !== comment.writerUser.id && (
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
          <CommentEdit comment={comment} setIsEdit={setIsEdit} />
        )}
      </CommentWrap>
      <ConfirmModal
        isOpenModal={isOpenModal}
        onModalCancelButtonClickEvent={handleModalCloseButtonClick}
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

// 펜 모양 보여주는 컴포넌트
const Edit = styled.div`
  width: fit-content;
  color: #dee2e6;
  margin-right: 5px;
  font-size: 1.2rem;
  &:hover {
    color: #7cd1b8;
  }
`;

// 쓰레기통 보여주는 컴포넌트
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
