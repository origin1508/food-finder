import styled from 'styled-components';
import KakaoMap from '../map/KakaoMap';
import { MediumTitle } from '../../styles/commonStyle';

const PlaceResult = () => {
  return (
    <PlaceResultContainer>
      <RecipeResultTitle>"김치찌개" 맛집</RecipeResultTitle>
      <MapContainer>
        <KakaoMap />
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
