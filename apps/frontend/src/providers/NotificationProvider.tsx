import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { MessagePayload } from 'firebase/messaging';

interface NotificationContextProps {
  notifications: any[];
  addNotification: (notification: any) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const addNotification = (notification: any) => {
    setNotifications(prevNotifications => [...prevNotifications, notification]);
  };

  // useEffect(() => {
  //   onForegroundMessage()
  //     .then(payload => {
  //       console.log({ payload });
  //       addNotification(payload);
  //     })
  //     .catch(err => console.log('failed: ', err));
  // }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
