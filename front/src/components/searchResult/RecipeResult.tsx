import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import RecipeCard from '../recipe/RecipeCard';
import CustomIcon from '../icons/CustomIcon';
import { searchResultState } from '../../atom/searchResult';
import { SearchValue } from '../../types/search/searchType';
import { BigTitle, MediumTitle } from '../../styles/commonStyle';

const RecipeResult = ({ keyword }: SearchValue) => {
  const searchResult = useRecoilValue(searchResultState);
  return (
    <RecipeResultContainer>
      <RecipeResultImg>
        <RecipeResultImgTitle>{keyword}</RecipeResultImgTitle>
      </RecipeResultImg>
      <RecipeResultTitle>
        <CustomIcon name="quoteLeft" size="16" />
        {keyword}
        <CustomIcon name="quoteRight" size="16" /> RECIPE
      </RecipeResultTitle>
      <RecipeResultList>
        {searchResult.map((item) => {
          const {
            dish_id,
            name,
            views,
            image_url1,
            image_url2,
            likes,
            nickname,
          } = item;
          return (
            <RecipeCard
              img={image_url1}
              title={name}
              channelUuid={dish_id}
              views={views}
              likes={likes}
              creator={nickname}
              onMoreClick={() => {}}
            />
          );
        })}
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
