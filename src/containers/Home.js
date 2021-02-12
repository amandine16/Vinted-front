import HomeContainer from "../components/HomeContainer";
import HeaderHero from "../components/HeaderHero";

const Home = ({ checkOrder, priceMax, priceMin, search, filters }) => {
  return (
    <div className="Home">
      {/* bandeau hero sous header */}
      <HeaderHero />
      {/* les articles en vente */}
      <HomeContainer
        priceMax={priceMax}
        priceMin={priceMin}
        checkOrder={checkOrder}
        search={search}
        filters={filters}
      />
    </div>
  );
};

export default Home;
