import HomeContainer from "../components/HomeContainer";
import HeaderHero from "../components/HeaderHero";

const Home = ({
  filters,
  messageNotFoundArticles,
  setMessageNotFoundArticles,
}) => {
  return (
    <div className="Home">
      {/* bandeau hero sous header */}
      <HeaderHero />
      {/* les articles en vente */}
      <HomeContainer
        filters={filters}
        messageNotFoundArticles={messageNotFoundArticles}
        setMessageNotFoundArticles={setMessageNotFoundArticles}
      />
    </div>
  );
};

export default Home;
