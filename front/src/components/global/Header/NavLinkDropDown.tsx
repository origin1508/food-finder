import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomIcon from '../../icons/CustomIcon';
import basicProfileImg from '../../../assets/basicProfileImg.png';
import { PATH } from '../../../customRouter';

const NavLinkDropDown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <DropDownButton onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <UserImg src={basicProfileImg} />
        <Nickname>들자구</Nickname>
        <CustomIcon name="toggleDown" size="17" color="inherit"></CustomIcon>
      </DropDownButton>
      <DropDownContainer itemScope={isDropdownOpen}>
        <UserInfo>
          <UserInfoContent>들자구</UserInfoContent>
          <UserInfoContent>eodnsdlekd@naver.com</UserInfoContent>
        </UserInfo>
        <Profile onClick={() => navigate(PATH.PROFILE)}>Profile</Profile>
        <Logout>Logout</Logout>
      </DropDownContainer>
    </>
  );
};

const DropDownButton = styled.button`
  position: relative;
  ${({ theme }) => theme.mixins.flexBox}
  color:${({ theme }) => theme.mainWhite};
  gap: 1rem;
  &:hover {
    color: ${({ theme }) => theme.mainBlack};
  }
`;
const Nickname = styled.div`
  font-weight: ${({ theme }) => theme.weightSemiBold};
`;
const UserImg = styled.img`
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 100;
`;
const DropDownContainer = styled.div`
  position: absolute;
  ${({ theme }) => theme.mixins.flexBox('column', 'flex-start', 'space-around')}
  top:7rem;
  color: ${({ theme }) => theme.darkGrey};
  right: 7%;
  font-weight: ${({ theme }) => theme.weightSemiBold};
  gap: 0.1rem;
  width: 20rem;
  height: 20vh;
  background-color: ${({ theme }) => theme.lightDarkGrey};
  ${(props) =>
    props.itemScope
      ? `visibility: visible;
  `
      : `visibility: hidden;
  `}

  border: ${({ theme }) => theme.lightDarkGrey} 1px solid;
  border-radius: 0.5rem;
  overflow: hidden; ;
`;
const UserInfo = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'center', 'center')}
  width: 100%;
  height: 40%;
  background-color: ${({ theme }) => theme.mainWhite};
`;
const UserInfoContent = styled.div`
  font-size: ${({ theme }) => theme.fontMicro};
  line-height: 1.5;
`;
const Profile = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  font-size: ${({ theme }) => theme.fontSmall};
  line-height: 1.5;
  cursor: pointer;
  width: 100%;
  height: 30%;
  background-color: ${({ theme }) => theme.mainWhite};
  &:hover {
    color: ${({ theme }) => theme.mainBlack};
    background-color: ${({ theme }) => theme.lightDarkGrey};
  }
`;
const Logout = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  font-size: ${({ theme }) => theme.fontSmall};
  line-height: 1.5;
  cursor: pointer;
  width: 100%;
  height: 30%;
  background-color: ${({ theme }) => theme.mainWhite};
  &:hover {
    color: ${({ theme }) => theme.mainBlack};
    background-color: ${({ theme }) => theme.lightDarkGrey};
  }
`;
export default NavLinkDropDown;
