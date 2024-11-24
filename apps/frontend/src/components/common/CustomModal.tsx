import {
  Button,
  HTMLChakraProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ThemingProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface CustomModalProps
  extends Omit<
      HTMLChakraProps<typeof Modal>,
      'children' | 'scrollBehavior' | 'size' | 'variant'
    >,
    ThemingProps {
  isOpen: boolean;
  onClose: () => void;
  bordered?: Boolean;
  header?: ReactNode | String;
  body?: ReactNode | String;
  footer?: ReactNode | String;
  title: string;
  size?: string;
  loading: boolean;
  type?: 'delete' | 'warning' | 'success' | 'general';
  handleConfirm?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  handleConfirm,
  body,
  loading,
  footer,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent bgColor={'white'}>
        <ModalHeader bgColor={'orange.500'} color={'white'}>
          {title}
        </ModalHeader>
        <ModalCloseButton color={'white'} />
        <ModalBody>{body}</ModalBody>
        {footer ?? (
          <ModalFooter>
            <Button
              bgColor="orange.500"
              isLoading={loading}
              _hover={{ backgroundColor: '#f7ba8a' }}
              color="white"
              loadingText="Saving..."
              mr={3}
              onClick={handleConfirm}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
