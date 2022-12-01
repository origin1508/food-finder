import styled from 'styled-components';

export const AuthInputContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: ${(props) => props.theme.spacingMedium};
`;

export const AuthInput = styled.input`
  ${({ theme }) => theme.mixins.input()};
`;

export const AuthButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 15rem;
`;

export const AuthButton = styled.button`
  ${({ theme }) => theme.mixins.mediumButton()};
  width: 100%;
  height: 5rem;
  margin-bottom: ${({ theme }) => theme.spacingSemiMedium};
  background-color: ${({ theme }) => theme.themeColor};
  color: ${({ theme }) => theme.mainWhite};
  &:active {
    transform: scale(0.98);
  }
`;
