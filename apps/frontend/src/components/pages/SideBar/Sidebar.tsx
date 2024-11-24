import React, { useEffect, useState } from "react";
import {
  Flex,
  HStack,
  Avatar,
  Text,
  Button,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { RxDashboard } from "react-icons/rx";
import NavItem from "./NavItem";
import "./styles.scss";
import { UserProfileModal } from "../../modals";
import { useGetProfileQuery } from "../../../resolvers";
// import NotificationPopover from '../../modals/notifications/Notifications.modal';
import { useAuthContext } from "../../../contexts";
import { VscSignOut } from "react-icons/vsc";
import { TbUsers } from "react-icons/tb";
import { FaRegMap } from "react-icons/fa";
import { RiTruckLine } from "react-icons/ri";
import { FaShop } from "react-icons/fa6";

interface Props {
  setCurrentView: (input: string) => void;
  currentView: string;
}
const Sidebar = (props: Props) => {
  const { currentView, setCurrentView } = props;
  const [navSize, setNavSize] = useState<"small" | "large">("small");
  const { getCurrentUser, user } = useGetProfileQuery();
  const { onUserLogout } = useAuthContext();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser, user]);

  const triggerButton = (
    <Button
      backgroundColor={"transparent"}
      pl={0}
      _hover={{ backgroundColor: "transparent" }}
    >
      <Avatar
        borderRadius="50%"
        bg="white"
        width="40px"
        height="40px"
        src={user?.profilePicture || undefined}
      />
      {navSize === "large" && (
        <Text className="white slightly-bold" pl={4}>
          {user?.username}
        </Text>
      )}
    </Button>
  );

  return (
    <Flex className={"sidebar"}>
      <Flex className="nav-container" as="nav">
        <VStack pb={8} pt={2}>
          <NavItem
            navSize={navSize}
            icon={RxDashboard}
            title="Dashboard"
            isActive={currentView === "Home"}
            description="This is the description for the dashboard."
            onClick={() => setCurrentView("Home")}
          />
          {/* <NavItem
            navSize={navSize}
            icon={FaRegMap}
            title="Map"
            description={""}
            isActive={currentView === "Map"}
            onClick={() => setCurrentView("Map")}
          /> */}
          <NavItem
            navSize={navSize}
            icon={FaShop}
            title="Inventory"
            isActive={currentView === "Inventory"}
            description={""}
            onClick={() => setCurrentView("Inventory")}
          />

          <NavItem
            navSize={navSize}
            icon={RiTruckLine}
            title="Orders"
            description={""}
            isActive={currentView === "Orders"}
            onClick={() => setCurrentView("Orders")}
          />
          <NavItem
            navSize={navSize}
            icon={TbUsers}
            title="Users"
            description={""}
            isActive={currentView === "Users"}
            onClick={() => setCurrentView("Users")}
          />
          <Stack mt={2} mb={2} zIndex={"2000"}>
            {/* <NotificationPopover
              handleNotificationClick={handleNotificationClick}
            /> */}
          </Stack>
        </VStack>
      </Flex>
      <HStack className={`user`} pb={5} justifyContent={"center"}>
        <VStack>
          <Flex pb={4}>
            <NavItem
              navSize={navSize}
              icon={VscSignOut}
              title="Logout"
              isActive={currentView === "Logout"}
              description={""}
              onClick={onUserLogout}
            />
          </Flex>
          <Flex ml={4}>
            <UserProfileModal triggerButton={triggerButton} />
          </Flex>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default Sidebar;
