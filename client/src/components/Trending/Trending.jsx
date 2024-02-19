import React from "react";
import { useState, useEffect } from "react";

import MovieCardTrending from "../MovieCardTrending/MovieCardTrending";
import { List, ListItem ,Box} from "@chakra-ui/react";
import axios from "../../api/axios";
import movieData from "../../data/data.json";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
 
 <Swiper width={240}>
        {data.map((movie) => {
          return (
            movie.isTrending && (
             
              <SwiperSlide>
              <Box
                year={movie.year}
                category={movie.category}
                rating={movie.rating}
                imageUrl={movie.thumbnail.trending.small}
                title={movie.title}
                key={movie.title}
                as={MovieCardTrending}
              />
              </SwiperSlide>
             
              
            )
          );
        })}
         </Swiper>
      
     
    </>
  );
};

export default Trending;
