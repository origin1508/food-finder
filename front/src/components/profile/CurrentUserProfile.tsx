import styled from 'styled-components';
import mockData from '../../util/mockData';
import basigProfileImg from '../../assets/basicProfileImg.png';
import CustomIcon from '../icons/CustomIcon';

const CurrentUserProfile = () => {
  const { auth } = mockData;
  return (
    <>
      <ProfileCardContainer>
        <UserInfoContainer>
          <UserImgContainer>
            <UserImg src={basigProfileImg} alt="userImg" />
            <ImgUpdateContainer>
              <CustomIcon name="upload" size="20" />
              <P>Change</P>
            </ImgUpdateContainer>
            <ImgUpdate type="file" accept="image/*" name="file" />
          </UserImgContainer>
          <Name>{auth.name}</Name>
          <Email>{auth.email}</Email>
        </UserInfoContainer>
        <UserInfoUpdateForm>
          <Label htmlFor="name">Name</Label>
          <Input name="name" type="text" placeholder="Your Name"></Input>
          <Label htmlFor="password">Your Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="Your Password"
          ></Input>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          ></Input>
          <Button>Update</Button>
        </UserInfoUpdateForm>
      </ProfileCardContainer>
    </>
  );
};

const ProfileCardContainer = styled.section`
  width: 40%;
  height: 80vh;
  background-color: ${({ theme }) => theme.mainWhite};
  border-radius: 1rem;
  border: 1px ${({ theme }) => theme.darkGrey};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const UserInfoContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.lightDarkGrey};
`;

const UserImgContainer = styled.div`
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.spacingSemiMedium};
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover span {
    bottom: 0%;
  }
`;
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;
const ImgUpdateContainer = styled.span`
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 50%;
  text-align: center;
  color: black;
  transition: 0.3s ease-in-out;
  background: #fff5;
`;
const P = styled.p`
  font-weight: ${({ theme }) => theme.weightSemiBold};
`;

const ImgUpdate = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;
const Name = styled.h5`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontRegular,
      theme.weightRegular,
      theme.mainBlack,
      theme.spacingSemiMedium,
    )}
`;
const Email = styled.span`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontRegular,
      theme.weightRegular,
      theme.darkGrey,
      theme.spacingSemiMedium,
    )}
`;

const UserInfoUpdateForm = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column', 'center', 'space-between')}
  height:65%;
  padding: 2rem 0;
`;

const Label = styled.label`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontRegular,
      theme.weightSemiBold,
      theme.mainBlack,
    )}
`;
const Input = styled.input`
  ${({ theme }) => theme.mixins.input}
  width: 60%;
`;

const Button = styled.button`
  ${({ theme }) => theme.mixins.mediumButton()}
  width: 60%;
`;
export default CurrentUserProfile;
