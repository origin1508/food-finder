import { AxiosError } from 'axios';
import styled from 'styled-components';
import { FallbackProps } from './ErrorBoundary';

const BackButton = () => {
  return <Button onClick={() => (location.href = '/')}>back</Button>;
};
const ErrorAlert = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Container>
      {error instanceof AxiosError ? (
        <>
          <Title>API Error</Title>
          <Error>Error Message : {error.message}</Error>
          <Button onClick={resetErrorBoundary}>Try Again</Button>
          <BackButton />
        </>
      ) : (
        <>
          <Title>UI Error</Title>
          <Error>Error Message : {error.message}</Error>
          <Button onClick={resetErrorBoundary}>Try Again</Button>
          <BackButton />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  background-color: ${({ theme }) => theme.lightGrey};
  width: 100%;
  height: 100vh;
  gap: 2rem;
`;
const Title = styled.h2`
  ${({ theme }) =>
    theme.mixins.title(theme.fontLarge, theme.weightSemiBold, theme.mainBlack)}
`;
const Error = styled.p`
  ${({ theme }) =>
    theme.mixins.title(theme.fontMedium, theme.weightSemiBold, theme.mainBlack)}
`;
const Button = styled.button`
  ${({ theme }) => theme.mixins.mediumButton()}
  width: 20%;
`;
export default ErrorAlert;
