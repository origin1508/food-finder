import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactFullpage from '@fullpage/react-fullpage';
import { PATH } from '../customRouter';
import mainImg from '../assets/mainImg.png';
import contentImg1 from '../assets/contentImg1.png';
import contentBg from '../assets/contentBg.png';
import contentBg2 from '../assets/contentBg2.png';
import mainRecipeImg from '../assets/mainRecipeImg.jpg';
import mainRecipeImg2 from '../assets/mainRecipeImg2.jpg';
import mainRecipeImg3 from '../assets/mainRecipeImg3.jpg';
import CustomIcon from '../components/icons/CustomIcon';
import { theme } from '../styles/theme';

const home = ['main', 'about', 'about2', 'about3'];
const Home = () => {
  const navigate = useNavigate();
  return (
    <ReactFullpage
      navigation
      navigationTooltips={home}
      scrollingSpeed={1000}
      onLeave={(origin, destination, direction) => {}}
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <Section className="section">
              <Container>
                <MainContent>
                  <AboutTitle>FoodFinder</AboutTitle>
                  <AboutSubTitle>레시피 검색 플랫폼</AboutSubTitle>

                  <TextOne>
                    다양한 레시피를 검색하고 공유해보세요 !
                    <br />
                    음식 관련 맛집 추천까지!
                  </TextOne>
                  <ServiceButton onClick={() => navigate(PATH.RECIPE)}>
                    서비스 이용하기
                  </ServiceButton>
                </MainContent>
                <MainImg src={mainRecipeImg} />
              </Container>
            </Section>

            <Section className="section">
              <Container>
                <MainImg src={mainRecipeImg2} />
                <MainContent>
                  <IconBox>
                    <CustomIcon
                      name="data"
                      size="120"
                      color={theme.themeColor}
                    />
                    <CustomIcon
                      name="food"
                      size="130"
                      color={theme.themeColor}
                    />
                  </IconBox>
                  <NumTitle>01.</NumTitle>
                  <AboutSubTitle>다양한 정보 제공</AboutSubTitle>

                  <TextOne>
                    400가지 이상의 다양한 레시피를 제공합니다.
                    <br />
                    레시피를 검색하면 관련 맛집 정보까지!
                  </TextOne>
                </MainContent>
              </Container>
            </Section>

            <Section className="section">
              <Container>
                <MainContent>
                  <IconBox>
                    <CustomIcon
                      name="aiSearch"
                      size="120"
                      color={theme.themeColor}
                    />
                  </IconBox>

                  <NumTitle>02.</NumTitle>
                  <AboutSubTitle>편리한 검색</AboutSubTitle>

                  <TextOne>
                    사진 속 음식이 궁금할 때?
                    <br />
                    AI 사진 검색기능으로 좀 더 편리하게!
                  </TextOne>
                </MainContent>
                <MainImg src={mainRecipeImg} />
              </Container>
            </Section>

            <Section className="section">
              <Container>
                <MainImg src={mainRecipeImg3} />
                <MainContent>
                  <IconBox>
                    <CustomIcon
                      name="comunity"
                      size="120"
                      color={theme.themeColor}
                    />
                  </IconBox>
                  <NumTitle>03.</NumTitle>
                  <AboutSubTitle>커뮤니티</AboutSubTitle>

                  <TextOne>
                    나만의 레시피를 공유해봐요!
                    <br />
                    서로의 레시피에 댓글도 달고 하트도 달고!
                  </TextOne>
                  <ServiceButton onClick={() => navigate(PATH.RECIPE)}>
                    서비스 이용하로 가기
                  </ServiceButton>
                </MainContent>
              </Container>
            </Section>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

const Section = styled.div`
  height: 100vh;
  width: 100%;
`;

const Container = styled.article`
  ${({ theme }) => theme.mixins.flexBox()}
  height: 100vh;
  width: 100%;
`;

const MainContent = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'end')}
  position:relative;
  padding: 8% 8%;
  background-color: ${({ theme }) => theme.lightGrey};
  width: 50%;
  height: 100%;
  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    ${({ theme }) => theme.mixins.flexBox('column')}
    width: 100%;
    background-image: url('https://images.unsplash.com/photo-1574009000204-8d793e519de8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80');
    background-size: cover;
    background-position: center;
  }
`;

const MainImg = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    display: none;
  }
`;

const IconBox = styled.div`
  ${({ theme }) => theme.mixins.flexBox('flex', 'center', 'start')}
  gap : 2rem;
  width: 100%;
  margin-bottom: 10vh;
  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    ${({ theme }) => theme.mixins.flexBox()}
  }
`;

const AboutTitle = styled.h2`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontLargest,
      theme.weightSemiBold,
      theme.themeColor,
      '25vh',
    )}
`;
const AboutSubTitle = styled.h3`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontMoreMeium,
      theme.weightSemiBold,
      theme.mainBlack,
      '3vh',
    )}
`;
const NumTitle = styled.h3`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontMedium,
      theme.weightSemiBold,
      theme.mainBlack,
      '1rem',
    )}
`;

const TextOne = styled.p`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightRegular,
      theme.darkGrey,
      '5vh',
    )}
  line-height:1.7;
`;

const ServiceButton = styled.button`
  ${({ theme }) => theme.mixins.bigButton(theme.themeColor, theme.lightGrey)}
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.darkGrey};
  }
`;

const ContentContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-around')}
  gap:4rem;
  width: 100%;
  height: 80%;
  padding: ${({ itemProp }) => itemProp};
`;

const TitleContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column', 'start')}
`;

const ContentTitle = styled.h2`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontMedium2,
      theme.weightBold,
      theme.mainWhite,
      '3vh',
    )}
`;
const ContentText = styled.p`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightRegular,
      theme.lightGrey,
    )}
  line-height:1.7;
`;

const ContentImg = styled.img`
  height: 60%;
  object-fit: cover;
  border-radius: 1rem;
`;
export default Home;
