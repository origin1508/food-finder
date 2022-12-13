import useSetAlert from '../../hooks/useSetAlert';
import styled, { keyframes } from 'styled-components';
import CustomIcon from '../icons/CustomIcon';
import { useEffect } from 'react';

interface Toast {
  title: string;
  body: string | string[];
  bgColor: string;
}

const Toast = ({ title, body, bgColor }: Toast) => {
  const { closeToast } = useSetAlert();

  const handleClose = () => {
    closeToast();
  };
  useEffect(() => {
    let timer = setTimeout(() => {
      handleClose();
    }, 1500);
  }, []);

  return (
    <ToastNotification itemProp={bgColor}>
      <FlexWrap>
        <Title>{title}</Title>
        <CloseButton onClick={handleClose}>
          <CustomIcon name="close" size="15" />
        </CloseButton>
      </FlexWrap>
      <FlexWrap>
        <TextContiner>
          <Text>
            {typeof body === 'string' ? (
              body
            ) : (
              <ul>
                {body.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            )}
          </Text>
        </TextContiner>
      </FlexWrap>
    </ToastNotification>
  );
};

const ToastNotification = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacingSemiMedium};
  right: ${({ theme }) => theme.spacingSemiMedium};
  width: 100%;
  max-width: 32rem;
  min-width: 20rem;
  color: ${({ theme }) => theme.mainWhite};
  padding: ${({ theme }) => theme.spacingSemiMedium};
  z-index: 99;
  border-radius: 0.5rem;
  background-color: ${({ itemProp }) => itemProp};
`;

const FlexWrap = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-between')}
`;
const Title = styled.span`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontRegular,
      theme.weightSemiBold,
      theme.mainWhite,
    )}
`;

const CloseButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox}
  height: 3.2rem;
  width: 3.2rem;
  background: none;
  transition: all 0.2s;
  border-radius: 0.5rem;
  &:hover {
    background-color: #fecaca;
  }
`;
const TextContiner = styled.div`
  font-size: ${({ theme }) => theme.fontRegular};
  line-height: 1.7;
  margin-left: ${({ theme }) => theme.spacingSemiMedium};
`;
const Text = styled.div``;
export default Toast;
