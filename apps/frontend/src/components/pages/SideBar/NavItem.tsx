import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  FlexProps,
  Tooltip,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  title: string;
  description: string;
  navSize: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  description = "",
  isActive = false,
  navSize,
  ...rest
}) => {
  return (
    <Flex
      ml={0}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
      backgroundColor={"transparent"}
      border={0}
      {...rest}
    >
      <Menu placement="right">
        <Tooltip
          label={title}
          color="white"
          bgColor={"#6f7ab0"}
          p={2}
          fontSize={"small"}
        >
          <Link
            backgroundColor={isActive ? "#6f7ab0" : "transparent"}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: "none", backgroundColor: "#6f7ab0" }}
            w={navSize === "large" ? "90%" : "auto"}
          >
            <MenuButton w="90%" border={0} backgroundColor={"transparent"}>
              <Flex
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Icon
                  as={icon}
                  fontSize="x-large"
                  alignItems={"center"}
                  color={"white"}
                />

                <Text
                  ml={10}
                  display={navSize === "small" ? "none" : "flex"}
                  color="white"
                  fontSize={"sm"}
                >
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        </Tooltip>
      </Menu>
    </Flex>
  );
};

export default NavItem;
