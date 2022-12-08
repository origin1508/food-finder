import styled, { css } from 'styled-components';
import { BaseComponentType } from '../../types/common/baseComponentType';
import { MediumSubTitle } from '../../styles/commonStyle';
import CustomIcon from '../icons/CustomIcon';

interface ModalProps extends BaseComponentType {
  isOpenModal: boolean;
  onModalAcceptButtonClickEvent?: (() => void) | (() => Promise<void>);
  onModalCancelButtonClickEvent: () => void;
}

const ConfirmModal = ({
  isOpenModal,
  onModalAcceptButtonClickEvent,
  onModalCancelButtonClickEvent,
  children,
}: ModalProps) => {
  return (
    <ModalBackDrop isOpenModal={isOpenModal}>
      <ModalContainer isOpenModal={isOpenModal}>
        <ModalHeader>
          <ModalImageContainer>
            <CloseButton onClick={onModalCancelButtonClickEvent}>
              <CustomIcon name="close" size="15" />
            </CloseButton>
          </ModalImageContainer>
        </ModalHeader>
        <ModalTextContainer>{children}</ModalTextContainer>

        <ModalButtonContainer>
          <ModalAcceptButton onClick={onModalAcceptButtonClickEvent}>
            ACCEPT
          </ModalAcceptButton>
          <ModalButton onClick={onModalCancelButtonClickEvent}>
            CANCEL
          </ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackDrop>
  );
};

interface VisibleModalProps {
  isOpenModal: boolean;
}

const isVisibleModal = css<VisibleModalProps>`
  ${(props) =>
    props.isOpenModal
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`;

export const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.1);
  ${isVisibleModal};
`;

export const ModalContainer = styled.div`
  ${({ theme }) => theme.fixedCenter};
  width: 44rem;
  height: auto;
  text-align: center;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mainWhite};
  padding: ${({ theme }) => theme.spacingSemiMedium};
  box-shadow: 1px 1px 3px ${({ theme }) => theme.darkGrey};
  ${isVisibleModal};
`;
export const ModalHeader = styled.div`
  width: 100%;
`;
export const ModalImageContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')};
`;

const CloseButton = styled.button`
  ${({ theme }) => theme.mixins.flexBox()}
  height: 3.2rem;
  width: 3.2rem;
  background: none;
  transition: all 0.2s;
  border-radius: 0.5rem;
  align-self: flex-end;
  &:hover {
    background-color: ${({ theme }) => theme.darkGrey};
  }
`;

export const ModalTextContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  gap: ${({ theme }) => theme.spacingMedium};
  margin: ${({ theme }) => theme.spacingLarge} 0;
  ${MediumSubTitle}
  margin-bottom:${({ theme }) => theme.spacingLarge};
`;
export const ModalButtonContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacingLarge};
  gap: ${({ theme }) => theme.spacingRegular};
`;

export const ModalAcceptButton = styled.button`
  ${({ theme }) => theme.mixins.smallButton()}
`;

export const ModalButton = styled.button`
  ${({ theme }) =>
    theme.mixins.smallButton(
      theme.mainWhite,
      theme.themeColor,
      `1px solid ${theme.themeColor}`,
    )}
`;

export default ConfirmModal;
