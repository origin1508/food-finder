import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../../../atom/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NavLinkDropDown from './NavLinkDropDown';
import { PATH } from '../../../customRouter';

const NavLink = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const navigate = useNavigate();
  return (
    <>
      {isLogin ? (
        <NavContainer>
          <Li>
            <Nav onClick={() => navigate(PATH.RECIPE)}>Recipe</Nav>
          </Li>
          <Li>
            <Nav>Create Recipe</Nav>
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
        <NavContainer>
          <Li>
            <Nav onClick={() => navigate(PATH.RECIPE)}>Recipe</Nav>
          </Li>
          <Li>
            <Login onClick={() => navigate(PATH.LOGIN)}>Login</Login>
          </Li>
        </NavContainer>
      )}
    </>
  );
};

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
  cursor: pointer;
  color: ${({ theme }) => theme.mainWhite};
  transition: all 0.5s;
  &:hover {
    color: ${({ theme }) => theme.mainBlack};
  }
`;
export default NavLink;
