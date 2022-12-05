import React, { useState, useEffect } from 'react';
import { authState } from '../../atom/auth';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CustomIcon from '../icons/CustomIcon';
import { MediumTitle } from '../../styles/commonStyle';
import { theme } from '../../styles/theme';
// import {
//   authFollowRequest,
//   authUnFollowRequest,
//   authFollowingRequest,
// } from "@/api/authFetcher";

const Like = () => {
  const user = useRecoilValue(authState);
  const [liked, setLiked] = useState(false);
  //   const userId = user?.userId;
  const handleClickLike = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liked) {
      //   await authFollowRequest('/recipe/like', userId);
      setLiked(true);
    } else {
      //   await authUnFollowRequest('/recipe/unlike', userId);
      setLiked(false);
    }
  };

  //   useEffect(() => {
  //     if (userId) {
  //       (async () => {
  //         const { result } = await authFollowingRequest('/recipe/like', userId);
  //         setFollowed(result.isFollowed);
  //       })();
  //     }
  //   }, [userId]);
  return (
    <LikeContainer>
      <LikeButtton onClick={handleClickLike}>
        <CustomIcon
          name={liked ? 'liked' : 'like'}
          size="25"
          color={theme.darkGrey}
        />
      </LikeButtton>
      <SubTitle>Like</SubTitle>
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row')}
  gap: ${({ theme }) => theme.spacingMedium};
`;
const SubTitle = styled.span`
  ${({ theme }) =>
    theme.mixins.title(theme.fontSemiMedium, '400', theme.darkGrey)}
`;

const LikeButtton = styled.button`
  transition: all 0.3s;
`;

export default Like;
