import styled from 'styled-components';

const HeaderBgTheme = () => {
  return <HeaderStyle></HeaderStyle>;
};

const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 7rem;
  background-color: ${({ theme }) => theme.themeColor};
`;

export default HeaderBgTheme;
