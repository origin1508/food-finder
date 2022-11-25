import styled from 'styled-components';

const NotFound = () => {
  return (
    <Container>
      <NotFoundTitle> 404 | NotFound</NotFoundTitle>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 7rem);
`;
const NotFoundTitle = styled.h2`
  position: absolute;
  color: ${({ theme }) => theme.DarkGrey};
  ${({ theme }) => theme.absoluteCenter}
`;
export default NotFound;
