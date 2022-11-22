import styled from 'styled-components';

export const AuthInputContainer = styled.div`
  width: 100%;
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
  width: 100%;
  height: 5rem;
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacingSemiMedium};
  border-radius: 0.5rem;
  background-color: #2e83f5;
  color: ${({ theme }) => theme.mainWhite};

  &:active {
    transform: scale(0.98);
  }
`;
