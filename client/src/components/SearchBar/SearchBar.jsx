import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  return (
    <>
      <InputGroup marginTop="24px">
        <Input variant="flushed" placeholder="Search for movies or TV series" />
        <InputLeftElement>
          <Icon as={SearchIcon} />
        </InputLeftElement>
      </InputGroup>
    </>
  );
};

export default SearchBar;
