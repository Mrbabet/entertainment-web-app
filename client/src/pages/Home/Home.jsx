import axios from "../../api/axios";

import SearchBar from "../../components/SearchBar/SearchBar";
import Trending from "../../components/Trending/Trending";
import Section from "../../components/Section/Section";

const Home = () => {
  return (
    <>
      <SearchBar />
      <Section title="Trending">
        <Trending />
      </Section>
      <Section title="Recomended for you"></Section>
    </>
  );
};

export default Home;
