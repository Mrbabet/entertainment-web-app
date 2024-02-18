import axios from "../../api/axios";

import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const fetchData = async () => {
    const response = await axios.get("/movie");
    console.log(response.data);
  };
  fetchData();
  return (
    <>
      <SearchBar />
      <main></main>
    </>
  );
};

export default Home;
