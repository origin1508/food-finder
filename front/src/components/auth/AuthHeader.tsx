import styled from 'styled-components';

interface AuthHeaderProps {
  children: React.ReactNode;
}

const AuthHeader = ({ children }: AuthHeaderProps) => {
  return (
    <AuthHeaderContainer>
      <AuthHeaderTitle>{children}</AuthHeaderTitle>
    </AuthHeaderContainer>
  );
};

export default AuthHeader;

const AuthHeaderContainer = styled.section`
  flex-shrink: 0;
  width: 100%;
  height: 8rem;
  margin-bottom: ${({ theme }) => theme.spacingLarge};
  border-bottom: 1px solid ${({ theme }) => theme.lightDarkGrey};
`;

const AuthHeaderTitle = styled.h2`
  font-weight: ${({ theme }) => theme.weightBold};
  font-size: ${({ theme }) => theme.fontLarge};
`;
