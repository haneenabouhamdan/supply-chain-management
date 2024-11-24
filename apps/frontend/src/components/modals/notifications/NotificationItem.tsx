import React from 'react';
import { Text, HStack, VStack, Badge, Button } from '@chakra-ui/react';
import { NotificationStatus } from '../../../resolvers/notifications';

interface NotificationProps {
  id: string;
  userId: string;
  messageId: string | null;
  title: string;
  text: string;
  channelId: string;
  status: NotificationStatus;
}

export const NotificationItem: React.FC<NotificationProps> = (
  props: NotificationProps
) => {
  const onAccept = () => {};
  const onDismiss = () => {};
  return (
    <HStack
      p={2}
      w="100%"
      alignItems="start"
      bgColor={
        props.status === NotificationStatus.PENDING ? 'blue.100' : 'grey.300'
      }
    >
      <VStack align="start" spacing={1}>
        <Text fontSize="sm" fontWeight="bold" justifyContent={'left'}>
          {props.title}
        </Text>
        <Text fontSize="xs">{props.text}</Text>
        {/* this is an invitation */}
        {props.status === NotificationStatus.PENDING && props.channelId && (
          <HStack width="100%" justifyContent={'right'} pt={1}>
            <Button size="xs" colorScheme="green" onClick={() => onAccept()}>
              Accept
            </Button>
            <Button size="xs" colorScheme={'gray'} onClick={() => onDismiss()}>
              Dismiss
            </Button>
          </HStack>
        )}
      </VStack>
    </HStack>
  );
};
