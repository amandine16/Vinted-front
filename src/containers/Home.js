import HomeContainer from "../components/HomeContainer";
import HeaderHero from "../components/HeaderHero";
import SearchHeader from "../components/SearchHeader";

const Home = ({
  filters,
  messageNotFoundArticles,
  setMessageNotFoundArticles,
  setFilters,
}) => {
  return (
    <>
      {/* FILTERS */}
      <SearchHeader filters={filters} setFilters={setFilters} />
      <div className="Home">
        {/* bandeau hero sous header */}
        <HeaderHero />
        {/* les articles en vente */}
        <HomeContainer
          filters={filters}
          setFilters={setFilters}
          messageNotFoundArticles={messageNotFoundArticles}
          setMessageNotFoundArticles={setMessageNotFoundArticles}
        />
      </div>
    </>
  );
};

export default Home;
