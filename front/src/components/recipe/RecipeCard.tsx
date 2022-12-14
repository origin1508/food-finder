import styled from 'styled-components';
import { SmallTitle, SmallSubTitle } from '../../styles/commonStyle';

interface RecipeCardProps {
  img: string;
  title: string;
  channelUuid: number;
  views: number;
  likes: number;
  creator?: string;
  onClickDetailPage: () => void;
  size?: string;
}

const RecipeCard = ({
  img,
  title,
  views,
  likes,
  creator,
  onClickDetailPage,
  size = '24',
}: RecipeCardProps) => {
  return (
    <CardContainer itemProp={size} onClick={onClickDetailPage}>
      <CardImg src={img} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {creator ? <CardCreator>@ {creator}</CardCreator> : null}
        <CardInfoList>
          <List>
            <Veiws>조회수 {views} </Veiws>
          </List>
          <List>
            <Likes>좋아요 {likes}</Likes>
          </List>
        </CardInfoList>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: none;
  width: ${({ itemProp }) => (itemProp ? `${itemProp}vh` : '24vh')};
  height: ${({ itemProp }) => (itemProp ? `${itemProp}vh` : '24vh')};
  border-radius: 0.7rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    width: ${({ itemProp }) => `${Number(itemProp) / 1.2}vh`};
    height: ${({ itemProp }) => `${Number(itemProp) / 1.2}vh`};
  }
  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    width: ${({ itemProp }) => `${Number(itemProp) / 1.4}vh`};
    height: ${({ itemProp }) => `${Number(itemProp) / 1.4}vh`};
  }
`;

const CardImg = styled.img`
  height: 70%;
  background-size: cover;
`;

const CardContent = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'start', 'space-around')}
  font-size: ${({ theme }) => theme.fontMicro};
  height: 30%;
  padding: 0.5rem 0.7rem;
  background-color: ${({ theme }) => theme.mainWhite};
`;

const CardTitle = styled.h2`
  ${SmallTitle}
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  letter-spacing: -0.05em;
`;

const CardCreator = styled.h4`
  ${SmallSubTitle}
`;
const CardInfoList = styled.ul`
  display: flex;
  justify-content: left;
`;

const List = styled.li`
  ${({ theme }) => theme.mixins.flexBox}
  margin-right: 0.5rem;
  span {
    margin-left: 1rem;
  }
`;

const Veiws = styled.span`
  ${({ theme }) =>
    theme.mixins.title(theme.fontSmall, theme.weightRegular, theme.darkGrey)}
`;
const Likes = styled.span`
  ${({ theme }) =>
    theme.mixins.title(theme.fontSmall, theme.weightRegular, theme.darkGrey)}
`;

export default RecipeCard;
