import styled from 'styled-components';
import KakaoMap from '../map/KakaoMap';
import CustomIcon from '../icons/CustomIcon';
import { SearchValue } from '../../types/search/searchType';
import { MediumTitle } from '../../styles/commonStyle';

const PlaceResult = ({ keyword }: SearchValue) => {
  return (
    <PlaceResultContainer>
      <RecipeResultTitle>
        <CustomIcon name="quoteLeft" size="16" />
        {keyword}
        <CustomIcon name="quoteRight" size="16" /> 맛집
      </RecipeResultTitle>
      <MapContainer>
        <KakaoMap keyword={keyword} />
      </MapContainer>
    </PlaceResultContainer>
  );
};

export default PlaceResult;

const PlaceResultContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')};
  width: 100%;
  height: 80rem;
  margin: ${({ theme }) => theme.spacingLarge} 0;
  padding: 0 ${({ theme }) => theme.spacingLarge};
  gap: ${({ theme }) => theme.spacingLarge};
`;

const RecipeResultTitle = styled.h2`
  ${MediumTitle}
  align-self: start;
  color: ${({ theme }) => theme.mainBlack};
`;

const MapContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
