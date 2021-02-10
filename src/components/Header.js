import TopHeader from "./TopHeader";
import HeaderHero from "./HeaderHero";

const Header = () => {
  return (
    <div className="Header">
      {/* Top Header */}
      <TopHeader />
      {/* bandeau hero sous header */}
      <HeaderHero />
    </div>
  );
};

export default Header;
