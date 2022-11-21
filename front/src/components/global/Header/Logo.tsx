import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return <Img src={logo} alt="logo" onClick={() => navigate('/')} />;
};

const Img = styled.img`
  height: 2rem;
  cursor: pointer;
`;

export default Logo;
