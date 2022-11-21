import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import Search from './Search';
import NavLink from './NavLink';
import Logo from './Logo';

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <ContentContainer>
        <Logo />
        <NavLink />
      </ContentContainer>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  padding: 0 8%;
  background-color: ${({ theme }) => theme.themeColor};
  background: none;
  z-index: 50;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 7rem;

  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-between')}
`;

const Div = styled.div``;
