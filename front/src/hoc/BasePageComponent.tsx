import styled from 'styled-components';

interface BasePageComponentProps {
  children: React.ReactNode;
}

const BasePageComponent = ({ children }: BasePageComponentProps) => {
  return <BasePageComponentContainer>{children}</BasePageComponentContainer>;
};

export default BasePageComponent;

const BasePageComponentContainer = styled.main`
  width: 100%;
  height: 100vh;
  padding-top: 7rem;
  overflow: auto;
`;
