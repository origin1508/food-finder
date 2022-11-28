import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import Search from './Search';
import NavLink from './NavLink';
import Logo from './Logo';
import Search from '../../common/Search';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const MIN_SCROLL_Y = 20;

  const updateScroll = () => {
    setScrollPosition(window.scrollY ?? document.documentElement.scrollTop);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener('scroll', updateScroll);
    }, 50);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', updateScroll);
    };
  }, [scrollPosition]);

  return (
    <HeaderContainer
      itemProp={scrollPosition < MIN_SCROLL_Y ? 'origin' : 'change'}
    >
      <ContentContainer>
        <Logo />
        <Search display={scrollPosition < MIN_SCROLL_Y ? 'none' : 'block'} />
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
