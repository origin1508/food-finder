import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../../../atom/auth';
import styled from 'styled-components';
import CustomIcon from '../../icons/CustomIcon';
import basicProfileImg from '../../../assets/basicProfileImg.png';
import { PATH } from '../../../customRouter';
import Storage from '../../../storage/storage';
import useSetAlert from '../../../hooks/useSetAlert';
import useOnClickOutside from '../../../hooks/useOnclickOutside';
import { theme } from '../../../styles/theme';

const NavLinkDropDown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setAlertSuccess } = useSetAlert();
  const [user, setUser] = useRecoilState(authState);
  const navigate = useNavigate();
  const navLinkDropdownRef = useRef<HTMLDivElement>(null);

  const hanldeClickLogout = () => {
    Storage.clearToken();
    setUser(null);
    setAlertSuccess({ success: '로그아웃 되었습니다.' });
    navigate(PATH.MAIN);
  };

  const handleOutsideClicks = (event: MouseEvent) => {
    if (
      isDropdownOpen &&
      navLinkDropdownRef.current &&
      !navLinkDropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useOnClickOutside(navLinkDropdownRef, handleOutsideClicks);
  return (
    <Container>
      <DropDownButton
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
        ref={navLinkDropdownRef}
      >
        <UserImg
          src={user?.profileUrl !== null ? user?.profileUrl : basicProfileImg}
        />
        <Nickname>{user?.nickname}</Nickname>
        <CustomIcon name="toggleDown" size="17" color="inherit" />
      </DropDownButton>
      <DropDownContainer itemScope={isDropdownOpen}>
        <UserInfo>
          <UserInfoContent>{user?.nickname}</UserInfoContent>
          <UserInfoContent>{user?.email}</UserInfoContent>
        </UserInfo>
        <Profile
          onClick={() => {
            navigate(`/profile/${user?.userId}`);
            setIsDropdownOpen(false);
          }}
        >
          Profile
        </Profile>
        <LikedRestaurant
          onClick={() => {
            navigate(PATH.RESTAURANT);
            setIsDropdownOpen(false);
          }}
        >
          Liked Restaurant
        </LikedRestaurant>
        <Logout onClick={hanldeClickLogout}>Logout</Logout>
      </DropDownContainer>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
`;

const DropDownButton = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  cursor:pointer;
  color: ${({ theme }) => theme.mainWhite};
  gap: 1rem;
  &:hover {
    color: ${({ theme }) => theme.mainBlack};
  }
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    color: ${({ theme }) => theme.mainBlack};
  }
`;
const Nickname = styled.div`
  font-size: ${({ theme }) => theme.fontRegular};
  font-weight: ${({ theme }) => theme.weightSemiBold};
`;
const UserImg = styled.img`
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 100%;
`;
const DropDownContainer = styled.div`
  position: absolute;
  ${({ theme }) => theme.mixins.flexBox('column', 'flex-start', 'space-around')}
  top:7rem;
  color: ${({ theme }) => theme.darkGrey};
  right: 7%;
  gap: 0.1rem;
  width: 20rem;

  background-color: ${({ theme }) => theme.lightDarkGrey};
  display: ${({ itemScope }) => (itemScope ? 'block' : 'none')};

  border: ${({ theme }) => theme.lightDarkGrey} 1px solid;
  border-radius: 0.5rem;
  overflow: hidden;

  & > * {
    padding: 1rem;
  }
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    color: ${({ theme }) => theme.mainBlack};
    position: relative;
    top: 1rem;
    right: 0;
    border: none;
  }
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-align: center;
  letter-spacing: -0.05em;
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
const LikedRestaurant = styled.div`
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
