import { Link } from "react-router-dom";
import Header from "../components/Header";
import HomeContainer from "../components/HomeContainer";

const Home = () => {
  return (
    <div className="Home">
      {/* le header contient : Header + HeaderHero */}
      <Header />
      {/* les articles en vente */}
      <HomeContainer />
      <Link to="/offer">Offer</Link>
    </div>
  );
};

export default Home;
