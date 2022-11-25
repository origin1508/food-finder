import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import Search from './Search';
import NavLink from './NavLink';
import Logo from './Logo';
import Search from '../../common/Search';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    console.log('scroll', scrollPosition);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener('scroll', updateScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', updateScroll);
    };
  }, [scrollPosition]);

  return (
    <HeaderContainer itemProp={scrollPosition < 20 ? 'origin' : 'change'}>
      <ContentContainer>
        <Logo />
        <Search display={scrollPosition < 20 ? 'none' : 'block'} />
        <NavLink />
      </ContentContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.nav`
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

const ContentContainer = styled.div`
  width: 100%;
  height: 7rem;

  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-between')}
`;

const Div = styled.div``;
