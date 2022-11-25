// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useQuery } from 'react-query';
import styled from 'styled-components';
import { SmallTitle, SmallSubTitle } from '../../styles/commonStyle';

interface RecipeCardPropsType {
  img: string;
  title: string;
  channelUuid: string;
  views: string;
  likes: string;
  creator: string;
  onMoreClick: (channelUuid: string, index?: number) => void;
  index?: number;
}

// interface Todo {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

const RecipeCard = ({
  img,
  title,
  channelUuid,
  views,
  likes,
  creator,
  onMoreClick,
  index,
}: RecipeCardPropsType) => {
  // const { data: todos } = useQuery('todos', async () => {
  //   const { data } = await axios.get<Todo[]>(
  //     'https://jsonplaceholder.typicode.com/todos2',
  //   );

  //   return data;
  // });
  return (
    <CardContainer
      onClick={() => {
        onMoreClick(channelUuid, index);
      }}
    >
      {/* {todos?.map((todo) => todo.title)} */}
      <CardImg src={img} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardCreator>@ {creator}</CardCreator>
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
  width: 24vh;
  height: 24vh;
  border-radius: 0.7rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
