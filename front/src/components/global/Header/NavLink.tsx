import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NavLinkDropDown from './NavLinkDropDown';

function NavLink() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      {isLogin ? (
        <NavContainer>
          <Li>
            <Nav>Recipe</Nav>
          </Li>
          <Li>
            <Nav>Create Recipe</Nav>
          </Li>
          <Li>
            <Nav>Collect Recipes</Nav>
          </Li>
          <Li>
            <NavLinkDropDown />
          </Li>
        </NavContainer>
      ) : (
        <Login onClick={() => navigate('/login')}>Login</Login>
      )}
    </>
  );
}

const NavContainer = styled.ul`
  ${({ theme }) => theme.mixins.flexBox()}
  gap:4rem;
`;
const Li = styled.li``;
const Nav = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.mainWhite};
  transition: all 0.5s;
  &:hover {
    color: ${({ theme }) => theme.mainBlack};
  }
`;
const Login = styled.div`
  width: 7rem;
  height: 4rem;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.weightBold};
  padding: 1rem 1rem;
  background-color: ${({ theme }) => theme.themeColor};
  color: ${({ theme }) => theme.mainWhite};
  border-radius: 3rem;
  transition: all 0.5s;
  ${({ theme }) => theme.mixins.flexBox()}

  &:hover {
    background-color: ${({ theme }) => theme.darkGrey};
  }
`;
export default NavLink;
