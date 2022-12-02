import styled from 'styled-components';
import RecipeCard from '../recipe/RecipeCard';
import mockData from '../../util/mockData';
import { BigTitle, MediumTitle } from '../../styles/commonStyle';

const RecipeResult = () => {
  const { recipeDatas } = mockData;
  const { img, title, channelUuid, views, likes, creator, onMoreClick, index } =
    recipeDatas[0];
  return (
    <RecipeResultContainer>
      <RecipeResultImg>
        <RecipeResultImgTitle>김치찌개</RecipeResultImgTitle>
      </RecipeResultImg>
      <RecipeResultTitle>"김치찌개" RECIPE</RecipeResultTitle>
      <RecipeResultList>
        <RecipeCard
          img={img}
          title={title}
          channelUuid={channelUuid}
          views={views}
          likes={likes}
          creator={creator}
          onMoreClick={onMoreClick}
          index={index}
        />
        <RecipeCard
          img={img}
          title={title}
          channelUuid={channelUuid}
          views={views}
          likes={likes}
          creator={creator}
          onMoreClick={onMoreClick}
          index={index}
        />
        <RecipeCard
          img={img}
          title={title}
          channelUuid={channelUuid}
          views={views}
          likes={likes}
          creator={creator}
          onMoreClick={onMoreClick}
          index={index}
        />
        <RecipeCard
          img={img}
          title={title}
          channelUuid={channelUuid}
          views={views}
          likes={likes}
          creator={creator}
          onMoreClick={onMoreClick}
          index={index}
        />
        <RecipeCard
          img={img}
          title={title}
          channelUuid={channelUuid}
          views={views}
          likes={likes}
          creator={creator}
          onMoreClick={onMoreClick}
          index={index}
        />
      </RecipeResultList>
    </RecipeResultContainer>
  );
};

export default RecipeResult;

const RecipeResultContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')};
  width: 100%;
  height: 80%;
  padding: 0 ${({ theme }) => theme.spacingLarge};
  gap: ${({ theme }) => theme.spacingLarge};
`;

const RecipeResultImg = styled.div`
  height: 40vh;
  width: 100vw;
  text-align: center;
  background-image: url(https://images.pexels.com/photos/13774731/pexels-photo-13774731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.mainBlack};
`;

const RecipeResultImgTitle = styled.h2`
  ${BigTitle};
  width: 100%;
  height: 100%;
  line-height: 40vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

const RecipeResultTitle = styled.h2`
  ${MediumTitle}
  align-self: start;
  color: ${({ theme }) => theme.mainBlack};
`;

const RecipeResultList = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  gap: ${({ theme }) => theme.spacingLarge};
`;
