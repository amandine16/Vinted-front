import HomeContainer from "../components/HomeContainer";
import HeaderHero from "../components/HeaderHero";

const Home = () => {
  return (
    <div className="Home">
      {/* bandeau hero sous header */}
      <HeaderHero />
      {/* les articles en vente */}
      <HomeContainer />
    </div>
  );
};

export default Home;
