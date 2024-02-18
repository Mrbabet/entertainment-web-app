import {
  Card,
  CardBody,
  CardHeader,
  Box,
  ListItem,
  List,
  ListIcon,
  UnorderedList,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  IconMovies,
  IconBookmarkEmpty,
  IconTv,
} from "../../config/customIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
const MovieCardTrending = ({ title, imageUrl, year, rating, category }) => {
  return (
    <Card maxW="240px" w="100%" h="140px" borderRadius="lg" overflow="hidden">
      <Box
        p={"16px"}
        bgImage={`url(src/${imageUrl})`}
        bgSize="cover"
        bgPosition="center"
        h="100%"
        position="relative"
      >
        <Button
          p={0}
          bg="rgba(16, 20, 30, 0.5)"
          top="16px"
          right="16px"
          position="absolute"
          borderRadius="50%"
        >
          <FontAwesomeIcon icon={faBookmark} />
        </Button>
      </Box>
      <CardBody
        p="16px"
        position="absolute"
        bottom={0}
        fontSize="15px"
        fontWeight={500}
      >
        <UnorderedList
          fontSize="12px"
          fontWeight={300}
          color="rgba(255, 255, 255, 0.75)"
          m={0}
          display="flex"
          gap="32px"
        >
          <ListItem listStyleType="none">{year}</ListItem>
          <ListItem>
            {category === "Movie" && <Icon marginRight="6px" as={IconMovies} />}
            {category === "TV Series" && <Icon marginRight="6px" as={IconTv} />}
            {category}
          </ListItem>
          <ListItem>{rating}</ListItem>
        </UnorderedList>
        <CardHeader fontWeight={500} p={0}>
          {title}
        </CardHeader>
      </CardBody>
    </Card>
  );
};

export default MovieCardTrending;
