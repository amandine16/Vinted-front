import HomeContainer from "../components/HomeContainer";
import HeaderHero from "../components/HeaderHero";

const Home = ({ setCheckOrder, checkOrder }) => {
  return (
    <div className="Home">
      {/* bandeau hero sous header */}
      <HeaderHero />
      {/* les articles en vente */}
      <HomeContainer setCheckOrder={setCheckOrder} checkOrder={checkOrder} />
    </div>
  );
};

export default Home;
