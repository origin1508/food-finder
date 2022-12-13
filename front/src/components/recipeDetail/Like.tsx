import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CustomIcon from '../icons/CustomIcon';
import { theme } from '../../styles/theme';
import { useLike, useUnLike } from '../../hooks/Recipe/useLike';
import { authState } from '../../atom/auth';

const Like = ({ recipeId, liked }: { recipeId: number; liked: boolean }) => {
  const user = useRecoilValue(authState);
  const [isLiked, isSetLiked] = useState(false);
  const { mutate: setLike } = useLike(user?.userId!, String(recipeId));
  const { mutate: setUnLike } = useUnLike(user?.userId!, String(recipeId));

  const handleClickLike = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLiked) {
      setLike(recipeId);
      isSetLiked(true);
    } else {
      setUnLike(recipeId);
      isSetLiked(false);
    }
  };

  useEffect(() => {
    if (liked) {
      isSetLiked(true);
    }
  }, [liked]);
  return (
    <LikeContainer>
      <LikeButtton onClick={handleClickLike}>
        <CustomIcon
          name={isLiked ? 'liked' : 'like'}
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
