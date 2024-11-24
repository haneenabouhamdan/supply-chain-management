import React, { useState } from 'react';
import { Box, Flex, Text, Icon, Avatar, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import './styles.scss';

interface DropdownItemProps {
  icon?: React.ElementType;
  label: string;
  link?: string;
  avatarSrc?: string;
  subItems?: DropdownItemProps[];
  onClick?: () => void;
}

interface DropdownProps {
  title: string;
  items: DropdownItemProps[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  const renderItems = (items: DropdownItemProps[]) => {
    return items.map((item, index) => {
      const [subOpen, setSubOpen] = useState(true);
      return (
        <Box key={index} pl={2}>
          <Flex
            align="center"
            py={1}
            className="dropdown-item"
            onClick={() => {
              setSubOpen(!subOpen);
              if (item.onClick) item.onClick();
            }}
            cursor="pointer"
          >
            {item.icon && <Icon as={item.icon} mr={2} fontSize={'md'} />}
            {item.avatarSrc && <Avatar src={item.avatarSrc} size="md" mr={2} />}
            <Text fontSize={'md'}>{item.label}</Text>
            {item.subItems && (
              <Icon as={subOpen ? ChevronDownIcon : ChevronRightIcon} ml="5" />
            )}
          </Flex>
          {item.subItems && (
            <Collapse in={subOpen}>
              <Box>{renderItems(item.subItems)}</Box>
            </Collapse>
          )}
        </Box>
      );
    });
  };

  return (
    <Box w="100%" pb={2}>
      <Flex
        align="center"
        justify="space-between"
        onClick={() => setIsOpen(!isOpen)}
        cursor="pointer"
        p={2}
        className="dropdown-header"
      >
        <Text fontWeight="semi-bold" fontSize={'md'} height="fit-content">
          {title}
        </Text>
        <Icon as={isOpen ? ChevronDownIcon : ChevronRightIcon} />
      </Flex>
      <Collapse in={isOpen}>
        <Box>{renderItems(items)}</Box>
      </Collapse>
    </Box>
  );
};

export default Dropdown;
