import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import Search from './Search';
import NavLink from './NavLink';
import Logo from './Logo';
import Search from '../../common/Search';
import { PATH } from '../../../customRouter';

const Header = () => {
  const { pathname } = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isBackground, setIsBackground] = useState(false);
  const MIN_SCROLL_Y = 20;

  const updateScroll = () => {
    setScrollPosition(window.scrollY ?? document.documentElement.scrollTop);
  };

  useEffect(() => {
    if (pathname === PATH.RECIPE) {
      setIsBackground(false);
      const timer = setInterval(() => {
        window.addEventListener('scroll', updateScroll);
      }, 50);
      return () => {
        clearInterval(timer);
        window.removeEventListener('scroll', updateScroll);
      };
    } else if (pathname === PATH.MAIN) {
      setIsBackground(false);
    } else {
      setIsBackground(true);
    }
  }, [scrollPosition, pathname]);

  return (
    <HeaderContainer
      itemProp={
        isBackground || scrollPosition > MIN_SCROLL_Y ? 'change' : 'origin'
      }
    >
      <ContentContainer>
        <Logo />
        <Search
          display={
            isBackground || scrollPosition > MIN_SCROLL_Y ? 'block' : 'none'
          }
        />
        <NavLink />
      </ContentContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 8%;
  background: transparent;
  background-color: ${({ itemProp, theme }) =>
    itemProp === 'change' ? theme.themeColor : 'none'};
  z-index: 10;
  transition: all 0.5s;
`;

const ContentContainer = styled.nav`
  width: 100%;
  height: 7rem;

  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-between')}
`;
