import React, { useState } from 'react';
import styled from 'styled-components';
import CustomIcon from '../../icons/CustomIcon';
import basicProfileImg from '../../../assets/basicProfileImg.png';

function NavLinkDropDown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <DropDownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <UserImg src={basicProfileImg} />
        <Nickname>들자구</Nickname>
        <CustomIcon name="toggleDown" size="17" color="inherit"></CustomIcon>
      </DropDownButton>
      <DropDownContainer itemScope={isDropdownOpen}>
        <UserInfo>
          <UserInfoContent>들자구</UserInfoContent>
          <UserInfoContent>eodnsdlekd@naver.com</UserInfoContent>
        </UserInfo>
        <Profile>Profile</Profile>
        <Logout>Logout</Logout>
      </DropDownContainer>
    </>
  );
}

const DropDownButton = styled.button`
  position: relative;
  ${(props) => props.theme.mixins.flexBox}
  color:${(props) => props.theme.mainWhite};
  gap: 1rem;
  &:hover {
    color: ${(props) => props.theme.mainBlack};
  }
`;
const Nickname = styled.div`
  font-weight: ${(props) => props.theme.weightSemiBold};
`;
const UserImg = styled.img`
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 100;
`;
const DropDownContainer = styled.div`
  position: absolute;
  ${(props) =>
    props.theme.mixins.flexBox('column', 'flex-start', 'space-around')}
  top:7rem;
  color: ${(props) => props.theme.darkGrey};
  right: 7%;
  font-weight: ${(props) => props.theme.weightSemiBold};
  gap: 0.1rem;
  width: 20rem;
  height: 20vh;
  background-color: ${(props) => props.theme.lightDarkGrey};
  ${(props) =>
    props.itemScope
      ? `visibility: visible;
  `
      : `visibility: hidden;
  `}

  border: ${(props) => props.theme.lightDarkGrey} 1px solid;
  border-radius: 0.5rem;
  overflow: hidden; ;
`;
const UserInfo = styled.div`
  ${(props) => props.theme.mixins.flexBox('column', 'center', 'center')}
  width: 100%;
  height: 40%;
  background-color: ${(props) => props.theme.mainWhite};
`;
const UserInfoContent = styled.div`
  font-size: ${(props) => props.theme.fontMicro};
  line-height: 1.5;
`;
const Profile = styled.div`
  ${(props) => props.theme.mixins.flexBox}
  font-size: ${(props) => props.theme.fontSmall};
  line-height: 1.5;
  cursor: pointer;
  width: 100%;
  height: 30%;
  background-color: ${(props) => props.theme.mainWhite};
  &:hover {
    color: ${(props) => props.theme.mainBlack};
    background-color: ${(props) => props.theme.lightDarkGrey};
  }
`;
const Logout = styled.div`
  ${(props) => props.theme.mixins.flexBox}
  font-size: ${(props) => props.theme.fontSmall};
  line-height: 1.5;
  cursor: pointer;
  width: 100%;
  height: 30%;
  background-color: ${(props) => props.theme.mainWhite};
  &:hover {
    color: ${(props) => props.theme.mainBlack};
    background-color: ${(props) => props.theme.lightDarkGrey};
  }
`;
export default NavLinkDropDown;
