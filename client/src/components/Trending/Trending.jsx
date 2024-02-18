import React from "react";
import { useState, useEffect } from "react";

import MovieCardTrending from "../MovieCardTrending/MovieCardTrending";
import { List, ListItem } from "@chakra-ui/react";
import axios from "../../api/axios";
import movieData from "../../data/data.json";

const Trending = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(movieData);
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("/movie");

    //     setData(response.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <List>
        {data.map((movie) => {
          return (
            movie.isTrending && (
              <ListItem
                year={movie.year}
                category={movie.category}
                rating={movie.rating}
                imageUrl={movie.thumbnail.trending.small}
                title={movie.title}
                key={movie.title}
                as={MovieCardTrending}
              />
            )
          );
        })}
      </List>
    </>
  );
};

export default Trending;
