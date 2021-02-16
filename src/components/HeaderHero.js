import BandeauHeroSvg from "./BandeauHeroSvg";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const HeaderHero = ({ setModalLogin }) => {
  const userToken = Cookies.get("CookieUserToken");
  const history = useHistory();
  return (
    <div className="HeaderHero">
      <div className="imgFond-hero">
        <BandeauHeroSvg />
      </div>
      <div className="card-hero">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <button
          className="btn btn-green btn-buy-header"
          onClick={() => {
            userToken ? history.push("/publish") : setModalLogin(true);
          }}
        >
          Commencer à vendre
        </button>
      </div>
    </div>
  );
};

export default HeaderHero;
