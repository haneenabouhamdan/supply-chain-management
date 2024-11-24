import React, { ReactElement, useCallback } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CustomModal } from '../../common';
import { useGetProfileQuery } from '../../../resolvers';
import { EditUserForm } from './UserForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UpdateUserInput } from '../../../resolvers/user/Queries';
import { useUpdateUserMutation } from '../../../resolvers/user/update-user.service';
import { updateUserSchema } from '../../validations';

interface UserProfileModalProps {
  triggerButton: ReactElement;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  triggerButton,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getCurrentUser, user } = useGetProfileQuery();
  const { updateUser } = useUpdateUserMutation();

  const openModal = () => {
    onOpen();
    getCurrentUser();
  };

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserInput>({
    mode: 'all',
    resolver: yupResolver(updateUserSchema),
  });

  const toast = useToast();

  const onConfirm = useCallback(
    (data: UpdateUserInput) => {
      if (!user || !user.id) return;
      const payload = {
        ...data,
        id: user?.id,
      };
      try {
        updateUser(payload).then(() => {
          toast({
            description: 'User updated successfully',
            status: 'success',
            duration: 2000,
            position: 'top-right',
            isClosable: true,
          });
          onClose();
        });
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    },
    [updateUser, onClose, user?.id]
  );

  return (
    <>
      <div onClick={openModal}>{triggerButton}</div>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Profile"
        size="lg"
        body={
          isOpen &&
          user && (
            <EditUserForm
              user={user}
              onClose={onClose}
              reset={reset}
              setValue={setValue}
              register={register}
              errors={errors}
            />
          )
        }
        loading={false}
        handleConfirm={handleSubmit(onConfirm, err => console.log(err))}
      />
    </>
  );
};
