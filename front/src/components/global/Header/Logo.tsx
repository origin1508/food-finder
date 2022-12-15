import styled from 'styled-components';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../customRouter';

const Logo = () => {
  const navigate = useNavigate();
  return <Img src={logo} alt="logo" onClick={() => navigate(PATH.MAIN)} />;
};

const Img = styled.img`
  height: 2rem;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    height: 3rem;
  }
`;

export default Logo;
