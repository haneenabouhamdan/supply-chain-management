import React from 'react';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { FormInput } from '../../common';

interface ChangePasswordProps {
  changePassword: boolean;
  setChangePassword: (value: boolean) => void;
  errors: any;
  register: any;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  changePassword,
  setChangePassword,
  errors,
  register,
}) => {
  return (
    <Box mb={8} display={'flex'} flexDirection={'column'}>
      <Button
        colorScheme="orange.300"
        width={'fit-content'}
        variant="outline"
        onClick={() => setChangePassword(!changePassword)}
      >
        Change Password
      </Button>
      {changePassword && (
        <Box m={5}>
          <VStack spacing={4}>
            <FormInput
              label="Current Password*"
              type="password"
              error={errors.password?.message}
            />
            <FormInput
              label="New Password*"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
            <FormInput
              label="Confirm New Password*"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </VStack>
          <Flex justifyContent={'flex-end'} mt={3}>
            <Button
              bgColor="#f4a261"
              color="white"
              size={'sm'}
              onClick={() => setChangePassword(!changePassword)}
            >
              Save Password
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ChangePassword;
