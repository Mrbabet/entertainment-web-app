import {
  Box,
  Flex,
  Icon,
  List,
  ListIcon,
  ListItem,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  IconHome,
  IconBookmark,
  IconMovies,
  IconTv,
  IconLogo,
} from "../../config/customIcons";
import { useLocation } from "react-router-dom";
import AvatarImg from "../../assets/image-avatar.png";

const Navigation = () => {
  const location = useLocation();

  return (
    <>
      <Flex w="100%" p="16px 18px" justifyContent="space-between" bg="#161D2F">
        <Icon color="#FC4747" boxSize={5} as={IconLogo}></Icon>
        <Flex h="20px">
          <List display="flex" gap="24px">
            <ListItem>
              <ChakraLink as={Link} to="/">
                <ListIcon
                  color={location.pathname === "/" ? "#fff" : "#5A698F"}
                  boxSize={6}
                  m={0}
                  as={IconHome}
                />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink as={Link} to="/movies">
                <ListIcon
                  color={location.pathname === "/movies" ? "#fff" : "#5A698F"}
                  boxSize={6}
                  m={0}
                  as={IconMovies}
                />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink as={Link} to="/tv-series">
                <ListIcon
                  color={
                    location.pathname === "/tv-series" ? "#fff" : "#5A698F"
                  }
                  display="block"
                  boxSize={6}
                  m={0}
                  as={IconTv}
                />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink as={Link} to="/bookmarked">
                <ListIcon
                  color={
                    location.pathname === "/bookmarked" ? "#fff" : "#5A698F"
                  }
                  boxSize={6}
                  m={0}
                  as={IconBookmark}
                />
              </ChakraLink>
            </ListItem>
          </List>
        </Flex>
        <Box>
          <Image w="24px" src={AvatarImg} alt="avatar image" />
        </Box>
      </Flex>
    </>
  );
};

export default Navigation;
