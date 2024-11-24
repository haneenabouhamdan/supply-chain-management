import React from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchInputProps extends InputProps {
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  ...props
}) => {
  return (
    <Flex
      w="70%"
      height="80%"
      className={props.className ?? "bg-light-purple"}
      borderRadius={"5px"}
    >
      <InputGroup pl={4} pr={4}>
        <Input
          placeholder={placeholder}
          pl={5}
          height="30px"
          id="search-input"
          name="search"
          className="bg-light-purple"
          _focus={{ backgroundColor: "#6f7ab0;", border: "0px" }}
          width={"100%"}
          border={0}
          fontSize={"medium"}
          fontStyle={"italic"}
          color="white"
          _placeholder={{ color: "white" }}
          {...props}
        />
        <InputRightElement pointerEvents="none" pb={2} pr={10}>
          <SearchIcon color="white" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
