// import React, { useEffect, useState } from "react";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverCloseButton,
//   PopoverBody,
//   List,
//   ListItem,
//   IconButton,
//   Image,
//   Box,
//   Text,
//   Flex,
//   Tooltip,
//   Button,
//   HStack,
//   VStack,
// } from "@chakra-ui/react";
// import { BsBell } from "react-icons/bs";
// import "./styles.scss";
// import { AllDone } from "../../common";
// import WebSocketService from "../../../resolvers/websoket/websocket.service";
// import {
//   NotificationDto,
//   NotificationStatus,
//   useFetchNotifications,
//   useUpdateNotificationStatusMutation,
// } from "../../../resolvers";

// interface Props {
//   handleNotificationClick: (
//     channelId: string,
//     channelName?: string,
//     channelDesc?: string
//   ) => void;
// }

// const NotificationPopover: React.FC<Props> = (props: Props) => {
//   const [allNotifications, setNotifications] = useState<NotificationDto[]>([]);
//   const [newNotifications, setNewNotifications] = useState(false);
//   const [channelNames, setChannelsNames] = useState([]);
//   const userId = localStorage.getItem("uId");
//   const { data } = useUserChannels(String(userId));
//   const { acceptInvitation } = useAcceptInvitation();
//   const { ignoreInvitation } = useIgnoreInvitation();

//   const { notifications, refetch } = useFetchNotifications({
//     statuses: [NotificationStatus.PENDING],
//     userId: String(userId),
//   });

//   const { updateStatus } = useUpdateNotificationStatusMutation();

//   useEffect(() => {
//     if (data?.length) {
//       const channelsNames = data.map((ch: any) => {
//         return { name: ch.name, id: ch.id, description: ch.description };
//       });
//       setChannelsNames(channelsNames);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (notifications)
//       setNotifications((prevNot) => [...prevNot, ...notifications]);
//   }, [notifications]);

//   useEffect(() => {
//     const handleConnect = () => {
//       console.log("Connected to WebSocket server");
//     };

//     const handleDisconnect = () => {
//       console.log("Disconnected from WebSocket server");
//     };

//     const handleNotifications = (notification: NotificationDto) => {
//       setNewNotifications(true);
//       setNotifications((prevNot) => [...prevNot, notification]);
//     };

//     WebSocketService.onConnect(handleConnect);
//     WebSocketService.onDisconnect(handleDisconnect);
//     WebSocketService.onNotification(handleNotifications);

//     return () => {
//       WebSocketService.socket.off("connect", handleConnect);
//       WebSocketService.socket.off("disconnect", handleDisconnect);
//       WebSocketService.socket.off("notification", handleNotifications);
//     };
//   }, []);

//   const clickNotification = (channel: Channel) => {
//     props.handleNotificationClick(
//       channel.id,
//       channel.name,
//       channel.description
//     );
//     setNotifications([]);
//     refetch();
//   };

//   const handleAccept = async (channelId: string, id: string) => {
//     acceptInvitation({ channelId, userId: String(userId) });
//     await updateStatus(id, NotificationStatus.READ);
//     setNotifications([]);
//     refetch();
//   };

//   const handleIgnore = async (channelId: string, id: string) => {
//     ignoreInvitation({ channelId, userId: String(userId) });
//     await updateStatus(id, NotificationStatus.DISMISSED);
//     setNotifications([]);
//     refetch();
//   };

//   return (
//     <Popover placement="right">
//       <PopoverTrigger>
//         <Box position="relative" display="inline-block">
//           <Tooltip
//             label={"Notifications"}
//             color="white"
//             bgColor={"#6f7ab0"}
//             p={2}
//             fontSize={"small"}
//           >
//             <IconButton
//               icon={<BsBell color="white" />}
//               backgroundColor={"transparent"}
//               fontSize="x-large"
//               p={3}
//               borderRadius={8}
//               _hover={{ textDecor: "none", backgroundColor: "#6f7ab0" }}
//               aria-label={"notifications"}
//             />
//           </Tooltip>
//           {newNotifications && (
//             <Box
//               position="absolute"
//               top="0"
//               right="0"
//               width="10px"
//               height="10px"
//               backgroundColor="orange"
//               borderRadius="50%"
//               border="2px solid orange"
//             />
//           )}
//         </Box>
//       </PopoverTrigger>
//       <PopoverContent
//         backgroundColor={"white"}
//         zIndex={2000}
//         maxW={"300px"}
//         maxH={"350px"}
//         overflowY={"scroll"}
//       >
//         <PopoverCloseButton />
//         <PopoverBody>
//           {!allNotifications?.length ? (
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               flexDirection={"column"}
//               p={4}
//             >
//               <Image src={AllDone} alt="All done" boxSize="100px" />
//               <Text pt={4} className="purple" fontWeight={"bold"}>
//                 No New Notifications
//               </Text>
//             </Box>
//           ) : (
//             <List spacing={4} mt={4} zIndex={2000}>
//               {allNotifications
//                 .sort((n, m) => (n.createdAt > m.createdAt ? -1 : 1))
//                 .map((notification: NotificationDto, index) => {
//                   const channel = (data || []).filter(
//                     (channel: Channel) => channel.id === notification.channelId
//                   );
//                   return (
//                     <ListItem
//                       key={index}
//                       height="100px"
//                       borderBottomWidth={"1px"}
//                       onClick={() => clickNotification(channel[0])}
//                     >
//                       <HStack
//                         p={2}
//                         w="100%"
//                         alignItems="start"
//                         bgColor={
//                           notification.status === NotificationStatus.PENDING
//                             ? "blue.100"
//                             : "grey.300"
//                         }
//                       >
//                         <VStack align="start" spacing={1}>
//                           <Text
//                             fontSize="sm"
//                             fontWeight="bold"
//                             justifyContent={"left"}
//                           >
//                             {notification.title}
//                           </Text>
//                           <Text fontSize="xs">{notification.text}</Text>

//                           {notification.title.includes("Invitation") && (
//                             <HStack
//                               width="100%"
//                               justifyContent={"right"}
//                               pt={1}
//                             >
//                               <Button
//                                 size="xs"
//                                 colorScheme="green"
//                                 onClick={() =>
//                                   handleAccept(
//                                     notification.channelId,
//                                     String(notification.id)
//                                   )
//                                 }
//                               >
//                                 Accept
//                               </Button>
//                               <Button
//                                 size="xs"
//                                 colorScheme={"gray"}
//                                 onClick={() =>
//                                   handleIgnore(
//                                     notification.channelId,
//                                     String(notification.id)
//                                   )
//                                 }
//                               >
//                                 Dismiss
//                               </Button>
//                             </HStack>
//                           )}
//                         </VStack>
//                       </HStack>
//                     </ListItem>
//                   );
//                 })}
//             </List>
//           )}
//         </PopoverBody>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default NotificationPopover;
