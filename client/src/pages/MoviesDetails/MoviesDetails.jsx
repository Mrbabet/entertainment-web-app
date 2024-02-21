import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MoreInfoTopBar from "../../components/MoreInfoTopBar/MoreInfoTopBar";
import { Box } from "@chakra-ui/react";

const MoviesDetails = () => {
  const url = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_AUTH}`,
            },
          }
        );

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [movieId]);
  console.log(data);

  return (
    <>
      <MoreInfoTopBar />
      {/* Main content */}
      <Box
        w={"100%"}
        h={"500px"}
        filter="auto"
        brightness="40%"
        bgImage={`url(${url}${data.backdrop_path})`}
        bgPosition="top"
        bgRepeat="no-repeat"
        bgSize={"cover"}
      >
        <Box h={"100%"} p={"30px 40px"}></Box>
      </Box>
      {/* SeriesCast comp */}
      {/* Social comp */}
      {/* Media comp */}
      {/* Recomended comp */}
    </>
  );
};

export default MoviesDetails;
