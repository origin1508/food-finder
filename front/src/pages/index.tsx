import React from 'react';
import styled from 'styled-components';
import mainImg from '../assets/mainImg.png';

const Home = () => {
  return (
    <Container itemProp={mainImg}>
      <AboutTitle>레시피 검색 플랫폼</AboutTitle>
      <AboutSubTitle>Food Finder</AboutSubTitle>
      <TextOne>다양한 레시피를 검색하고 공유해보세요 !</TextOne>
      <ServiceButton>서비스 이용하기</ServiceButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 8%;
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'center')}
  background-image: url(${({ itemProp }) => itemProp});
  background-size: cover;
  letter-spacing: 0.2rem;
`;

const AboutTitle = styled.div`
  font-size: ${({ theme }) => theme.fontLargest};
  color:{theme}) => props.theme.mainWhite};
  font-weight: ${({ theme }) => theme.weightSemiBold};
  margin-bottom: 2vh;
`;

const AboutSubTitle = styled.div`
  font-size: ${({ theme }) => theme.fontLarge};
  color: ${({ theme }) => theme.lightGrey};
  font-weight: ${({ theme }) => theme.weightRegular};
  margin-bottom: 5vh;
`;

const TextOne = styled.p`
  font-size: ${({ theme }) => theme.fontMedium};
  color: ${({ theme }) => theme.lightGrey};
  font-weight: ${({ theme }) => theme.weightRegular};
  margin-bottom: 5vh;
`;

const ServiceButton = styled.button`
  background-color: ${({ theme }) => theme.mainBlack};
  color: ${({ theme }) => theme.lightGrey};
  cursor: pointer;
  padding: 2rem 4rem;
  border-radius: 1rem;
  boder: 'none';
  font-size: ${({ theme }) => theme.fontSemiMedium};
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.darkGrey};
  }
`;
export default Home;
