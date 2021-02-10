import Header from "../components/Header";
import HomeContainer from "../components/HomeContainer";

const Home = () => {
  return (
    <div className="Home">
      {/* le header contient : Header + HeaderHero */}
      <Header />
      {/* les articles en vente */}
      <HomeContainer />
    </div>
  );
};

export default Home;
