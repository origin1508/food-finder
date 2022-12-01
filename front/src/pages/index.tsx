import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../customRouter';
import mainImg from '../assets/mainImg.png';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container itemProp={mainImg}>
      <AboutTitle>레시피 검색 플랫폼</AboutTitle>
      <AboutSubTitle>Food Finder</AboutSubTitle>
      <TextOne>다양한 레시피를 검색하고 공유해보세요 !</TextOne>
      <ServiceButton onClick={() => navigate(PATH.RECIPE)}>
        서비스 이용하기
      </ServiceButton>
    </Container>
  );
};

const Container = styled.article`
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'center')}
  width: 100%;
  height: 100vh;
  padding: 0 8%;
  background-image: url(${({ itemProp }) => itemProp});
  background-size: cover;
  letter-spacing: 0.2rem;
`;

const AboutTitle = styled.div`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontLargest,
      theme.weightSemiBold,
      theme.mainWhite,
      '2vh',
    )}
`;

const AboutSubTitle = styled.div`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontLarge,
      theme.weightRegular,
      theme.lightGrey,
      '5vh',
    )}
`;

const TextOne = styled.p`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontMedium,
      theme.weightRegular,
      theme.lightGrey,
      '5vh',
    )}
`;

const ServiceButton = styled.button`
  ${({ theme }) => theme.mixins.bigButton(theme.mainBlack, theme.lightGrey)}
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.darkGrey};
  }
`;
export default Home;
