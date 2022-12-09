import React, { useState } from 'react';
import styled from 'styled-components';
import CustomIcon from '../icons/CustomIcon';
import { theme } from '../../styles/theme';
import { useLike, useUnLike } from '../../hooks/Recipe/useLike';

const Like = ({ recipeId }: { recipeId: number }) => {
  const [liked, setLiked] = useState(false);
  const { mutate: setLike } = useLike();
  const { mutate: setUnLike } = useUnLike();

  const handleClickLike = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liked) {
      setLike(recipeId);
      setLiked(true);
    } else {
      setUnLike(recipeId);
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
