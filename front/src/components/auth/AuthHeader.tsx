import React from 'react';
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

const AuthHeaderContainer = styled.div`
  flex-shrink: 0;

  width: 100%;
  height: 10rem;
  margin-bottom: ${(props) => props.theme.spacingMedium};
  border-bottom: 1px solid ${(props) => props.theme.lightDarkGrey};
`;

const AuthHeaderTitle = styled.h2`
  font-weight: ${(props) => props.theme.weightBold};
  font-size: ${(props) => props.theme.fontLarge};
`;
