import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../../../atom/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NavLinkDropDown from './NavLinkDropDown';
import { PATH } from '../../../customRouter';
import { useState } from 'react';

const NavLink = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const [isOpne, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {isLogin ? (
        <NavContainer itemScope={isOpne}>
          <Li>
            <Nav onClick={() => navigate(PATH.RECIPE)}>Recipe</Nav>
          </Li>
          <Li>
            <Nav onClick={() => navigate(PATH.CREATE_RECIPE)}>
              Create Recipe
            </Nav>
          </Li>
          <Li>
            <Nav onClick={() => navigate(PATH.COLLECT_RECIPES)}>
              Collect Recipes
            </Nav>
          </Li>
          <Li>
            <NavLinkDropDown />
          </Li>
        </NavContainer>
      ) : (
        <NavContainer itemScope={isOpne}>
          <Li>
            <Nav onClick={() => navigate(PATH.RECIPE)}>Recipe</Nav>
          </Li>
          <Li>
            <Login onClick={() => navigate(PATH.LOGIN)}>Login</Login>
          </Li>
        </NavContainer>
      )}
      <BurgerMenu
        className={isOpne ? 'active' : ''}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span></span>
      </BurgerMenu>
    </>
  );
};

const NavContainer = styled.ul`
  ${({ theme }) => theme.mixins.flexBox()}
  gap: 4rem;

  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    ${({ theme }) => theme.mixins.flexBox('column')}
    background-color: ${({ theme }) => theme.mainWhite};
    position: fixed;
    top: 7rem;
    right: 0;
    border: ${({ theme }) => theme.lightDarkGrey} 1px solid;
    border-radius: 0.5rem;
    padding: 3.5vw;
    display: ${({ itemScope }) => (itemScope ? '' : 'none')};
  }
`;
const Li = styled.li``;
const Nav = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.mainWhite};
  transition: all 0.5s;
  &:hover {
    color: ${({ theme }) => theme.mainBlack};
  }
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    color: ${({ theme }) => theme.mainBlack};
    &:hover {
      color: ${({ theme }) => theme.themeColor};
    }
  }
`;
const Login = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.mainWhite};
  transition: all 0.5s;
  &:hover {
    color: ${({ theme }) => theme.mainBlack};
  }
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    color: ${({ theme }) => theme.mainBlack};
    &:hover {
      color: ${({ theme }) => theme.themeColor};
    }
  }
`;

const BurgerMenu = styled.div`
  width: 2.8rem;
  height: 32px;
  cursor: pointer;
  position: relative;
  display: none;
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    display: block;
  }
  &:before,
  & span,
  &:after {
    width: 100%;
    height: 2px;
    display: block;
    background: ${({ theme }) => theme.mainWhite};
    border-radius: 2px;
    position: absolute;
    opacity: 1;
  }

  &:before,
  &:after {
    transition: top 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      transform 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      background-color 1.15s cubic-bezier(0.86, 0, 0.07, 1);
    -webkit-transition: top 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      -webkit-transform 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1),
      background-color 1.15s cubic-bezier(0.86, 0, 0.07, 1);
    content: '';
  }

  &:before {
    top: 4px;
  }

  & span {
    top: 15px;
  }

  &:after {
    top: 26px;
  }

  /* Hover */
  &:hover:before {
    top: 7px;
  }

  &:hover:after {
    top: 23px;
  }

  /* Click */
  &.active span {
    opacity: 0;
  }

  &.active:before,
  &.active:after {
    top: 40%;
  }

  &.active:before {
    transform: rotate(45deg);
  }

  &.active:after {
    transform: rotate(-45deg);
  }

  &:focus {
    outline: none;
  }
`;
export default NavLink;
