import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
// import * as Api from '../../api';
import Comments from './Comments';
import mockData from '../../util/mockData';

interface CommentForm {
  recipeId: string;
  writerId: number;
  comments: Comment[];
}

interface CommentFormInitial {
  comment: string;
}

export interface Comment {
  writerUser: {
    name: string;
    id: number;
    imageUrl: string;
  };
  comment: string;
}
const CommentForm = ({ recipeId, writerId, comments }: CommentForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormInitial>({
    mode: 'onChange',
  });

  //   const fetch = async () => {
  //     try {
  //       const response = await Api.get(`api/comment/list`, recipeId);
  //       setComments(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  // 입력받은 방명록을 저장하기 위한 state

  //

  //   const addHandler = async (e) => {
  //     e.preventDefault();
  //     try {
  //       await Api.post(`api/comment/${writerId}`, inputs);
  //       fetch();
  //       setInputs({
  //         ...inputs,
  //         comment: '',
  //       });
  //     } catch (e) {}
  //   };

  // 기존 방명록을 받아와 저장
  //   useEffect(() => {
  //     fetch();
  //   }, [recipeId]);

  return (
    <CommentsFormContainer className="commet-container">
      <Comments comments={comments} />
      <InputForm>
        <Input
          type="text"
          placeholder="댓글을 입력해주세요."
          {...register!('comment')}
        />
        <SubitButton className="mt-2">등록</SubitButton>
      </InputForm>
    </CommentsFormContainer>
  );
};

const CommentsFormContainer = styled.article`
  width: 100%;
  ${({ theme }) => theme.mixins.flexBox('column')};
`;

const InputForm = styled.form`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 100%;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 80%;
  height: 10rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;

const SubitButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox()};
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;
export default CommentForm;
