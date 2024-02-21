import { Heading, Box, ListItem, List, Icon, Button } from "@chakra-ui/react";
import { IconMovies, IconTv } from "../../config/customIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Link as ChakraLink } from "react-router-dom";

const baseUrlForImages = "https://image.tmdb.org/t/p/w220_and_h330_face";

const MovieCard = ({ title, imageUrl, year, rating, mediaType, id }) => {
  return (
    <>
      <ChakraLink to={`movie/${id}`} position={"relative"} w={150} h={225}>
        <Box
          borderRadius={"10px"}
          bgImg={`${baseUrlForImages}${imageUrl}`}
          bgSize={"cover"}
          w={150}
          h={225}
        />
        <Button
          p={0}
          bg="rgba(0, 0, 0, 0.75)"
          top="8px"
          right="8px"
          position="absolute"
          borderRadius="50%"
          size="sm"
        >
          <FontAwesomeIcon icon={faBookmark} />
        </Button>
        <Box
          position={"absolute"}
          bottom={0}
          padding={"8px"}
          bg={"rgba(0, 0, 0, 0.75)"}
          borderRadius={"10px"}
          w="100%"
        >
          <List
            fontSize="8px"
            fontWeight={300}
            color="rgba(255, 255, 255, 0.75)"
            m={0}
            display="flex"
            justifyContent={"space-between"}
          >
            <ListItem listStyleType="none">{year}</ListItem>
            <ListItem textTransform={"capitalize"}>
              {mediaType === "movie" && (
                <Icon marginRight="6px" as={IconMovies} />
              )}
              {mediaType === "tv" && <Icon marginRight="6px" as={IconTv} />}
              {mediaType}
            </ListItem>
            <ListItem>{rating}</ListItem>
          </List>
          <Heading fontSize={15} fontWeight={500} pt={2}>
            {title}
          </Heading>
        </Box>
      </ChakraLink>
    </>
  );
};

export default MovieCard;
