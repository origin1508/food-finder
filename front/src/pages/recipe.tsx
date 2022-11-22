import React from 'react';
import RecipeCard from '../components/recipe/RecipeCard';
import mainImg from '../assets/mainImg.png';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Recipe = () => {
  const sampleData = {
    img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
    title: '김치찌개',
    channelUuid: '12321',
    views: '123',
    likes: '23',
    creator: '들자구',
    onMoreClick: () => console.log('onMoreClick'),
    index: 3,
  };
  return (
    <Container>
      <RecipeCard
        img={sampleData.img}
        title={sampleData.title}
        channelUuid={sampleData.channelUuid}
        views={sampleData.views}
        likes={sampleData.likes}
        creator={sampleData.creator}
        onMoreClick={sampleData.onMoreClick}
        index={sampleData.index}
      ></RecipeCard>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  ${({ theme }) => theme.mixins.flexBox()};
`;
export default Recipe;
