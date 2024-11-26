import {
  Flex,
  HStack,
  VStack,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import Sidebar from "./SideBar/Sidebar";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Dashboard from "./Dashboard";
import InventoryPage from "./Inventory/Inventory";
import OrdersPage from "./Orders/Orders";
import UsersPage from "./Users/Users";
import CustomersPage from "./Customers/Customers";

export default function Home() {
  const [currentView, setCurrentView] = useState<string>(() => {
    return localStorage.getItem("currentView") || "Home";
  });

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView]);

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex w="100%" h="100vh" overflow="hidden">
      {!isMobile && (
        <>
          <Flex borderRight={{ md: "0px solid #e6e6e6" }}>
            <Sidebar
              setCurrentView={setCurrentView}
              currentView={currentView}
            />
          </Flex>

          <Flex
            className="channel-content"
            flex="1"
            w={{ base: "100%", md: "70%" }}
            justifyContent="center"
            mt={isMobile ? "60px" : "0"}
          >
            {currentView === "Home" && <Dashboard />}
            {currentView === "Inventory" && <InventoryPage />}
            {currentView === "Orders" && <OrdersPage />}
            {currentView === "Users" && <UsersPage />}
            {currentView === "Customers" && <CustomersPage />}
            {/* {(currentView === 'DMs' || currentView === 'Home') && (
          <DmsList onSelectChannel={onSelectChannel} />
        )}
        {(currentView === 'Challenges' || currentView === 'Home') && (
          <ChallengeList onSelectChallenge={onSelectChannel} />
        )} */}
          </Flex>
        </>
      )}
      {isMobile && (
        <>
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            zIndex="1000"
            boxShadow="md"
            pl={2}
            pr={2}
            bg={"purple.300"}
          >
            <HStack justifyContent="space-between">
              <Button
                onClick={onOpen}
                borderRadius="10%"
                width="30px"
                height="40px"
                bg={"#6f7ab0"}
              >
                <HamburgerIcon w={6} h={6} color={"white"} />
              </Button>
            </HStack>
          </Box>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={"purple.300"} maxWidth="70%">
              <DrawerCloseButton color={"white"} />
              <DrawerBody mt={6}>
                <HStack>
                  <VStack>
                    {/* <MainList
                      currentView={currentView}
                      onSelectChannel={handleSelectChannel}
                      withLogout={true}
                    /> */}
                  </VStack>
                </HStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
      {/* <Flex
        className="channel-content"
        flex="1"
        w={{ base: '100%', md: '70%' }}
        justifyContent="center"
        mt={isMobile ? '60px' : '0'}
      >
        {loading ? (
          <Center w="100%" h="100%">
            <Spinner size="xl" />
          </Center>
        ) : !!selectedChannel?.channelId && !selectedChallenge ? (
          <Flex width="100%" id={selectedChannel.channelId}>
            <ChannelComponent
              channelId={selectedChannel.channelId}
              channelName={selectedChannel.channelName}
              channelDesc={selectedChannel.channelDesc}
            />
          </Flex>
        ) : (
          !!selectedChallenge && (
            <ChallengesComponent filter={selectedChallenge} />
          )
        )}

        {!loading && !selectedChallenge && !selectedChannel && (
          <Image
            src={WelcomeIcon}
            alt="welcome"
            boxSize={'50%'}
            justifyContent={'center'}
            alignSelf={'center'}
          />
        )}
      </Flex> */}
    </Flex>
  );
}
