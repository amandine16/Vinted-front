import { Link } from "react-router-dom";
import logoVinted from "../assets/img/logo-vinted.png";

const Header = ({ userToken, setUser }) => {
  return (
    <div className="Header">
      <div className="topHeader">
        <div className="logo-vinted">
          <img src={logoVinted} alt="logo Vinted" />
        </div>
        <div className="search-container">
          <div className="input-search">
            <input type="text" placeholder="Rechercher des articles" />
          </div>
          <div className="filters-containers">
            <span>Trier par prix</span>
            <span className="checkbox">
              <input type="checkbox" />
            </span>
            <span>Prix entre : </span>
            <div className="cursor-filter">-----</div>
          </div>
        </div>
        <div className="connexion-container">
          {/* Si le token existe, j'affiche que le btn de deconnexion */}
          {userToken ? (
            <button className="btn-deconnexion" onClick={() => setUser(null)}>
              Deconnexion
            </button>
          ) : (
            <>
              <Link to="/user/signup">
                <button className="btn-signup-header">S'inscrire</button>
              </Link>
              <Link to="/user/login">
                <button className="btn-login-header">Se connecter</button>
              </Link>
            </>
          )}
        </div>
        <div className="btn-buy">
          <button className="btn-buy-header">Vends tes articles</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
