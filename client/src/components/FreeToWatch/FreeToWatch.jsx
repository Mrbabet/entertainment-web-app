import { useState, useEffect } from "react";

import MovieCard from "../MovieCard/MovieCard";
import {
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Spinner,
  Box,
} from "@chakra-ui/react";

import axios from "axios";

const FreeToWatch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("movie");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_watch_monetization_types=free,`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_AUTH}`,
            },
          }
        );
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedTab]);

  const handleTabChange = (index) => {
    setSelectedTab(index === 0 ? "movie" : "tv");
  };

  return (
    <>
      {error && <Box color="red">{error}</Box>}

      <Tabs onChange={handleTabChange}>
        <TabList>
          <Tab>Movies</Tab>
          <Tab>Tv</Tab>
        </TabList>
        {loading && (
          <Spinner size="xl" thickness="4px" color="teal.500" margin="auto" />
        )}
        <TabPanels>
          {!loading && !error && (
            <TabPanel className="test">
              <Flex overflowX={"scroll"} gap={"16px"}>
                {data.map((movie) => {
                  return (
                    movie.release_date &&
                    movie.title && (
                      <MovieCard
                        year={movie.release_date}
                        mediaType={movie.media_type}
                        rating={movie.vote_average}
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        key={movie.id}
                      />
                    )
                  );
                })}
              </Flex>
            </TabPanel>
          )}
          {!loading && !error && (
            <TabPanel>
              <Flex overflowX={"scroll"} gap={"16px"} pb={"24px"}>
                {data.map((movie) => {
                  return (
                    movie.release_date &&
                    movie.title && (
                      <MovieCard
                        year={movie.release_date}
                        mediaType={movie.media_type}
                        rating={movie.vote_average}
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        key={movie.id}
                      />
                    )
                  );
                })}
              </Flex>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default FreeToWatch;
