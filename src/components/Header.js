import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";
import logoVinted from "../assets/img/logo-vinted.png";

const Header = ({
  userToken,
  setUser,

  filters,
  setFilters,
}) => {
  const handleChange = (input, e) => {
    if (input === "inputSearch") {
      const newFilters = { ...filters };
      newFilters.search = e;
      console.log(newFilters);
      setFilters(newFilters);
    }
    if (input === "inputPriceMin") {
      const newFilters = { ...filters };
      newFilters.priceMin = e;
      setFilters(newFilters);
    }
    if (input === "inputPriceMax") {
      const newFilters = { ...filters };
      newFilters.priceMax = e;
      setFilters(newFilters);
    }
  };
  return (
    <div className="Header">
      <div className="topHeader">
        <div className="logo-vinted">
          <img src={logoVinted} alt="logo Vinted" />
        </div>
        <div className="search-container">
          {/* SEARCH */}
          <div className="input-search">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleChange("inputSearch", e.target.value)}
              placeholder="Rechercher des articles"
            />
          </div>

          {/* CHECKBOX ORDER-PRICE */}
          <span className="checkbox-order-price">
            <div
              className="btn-price-order-container"
              onClick={() => {
                const newFilters = { ...filters };
                newFilters.checkOrder =
                  newFilters.checkOrder === "price-asc"
                    ? (newFilters.checkOrder = "price-desc")
                    : (newFilters.checkOrder = "price-asc");
                setFilters(newFilters);
              }}
            >
              <div
                className="knob"
                style={{ left: filters.checkOrder === "price-asc" ? 2 : 23 }}
              >
                {filters.checkOrder === "price-desc" ? (
                  <span>⇣</span>
                ) : (
                  <span>⇡</span>
                )}
              </div>
            </div>
          </span>

          {/* PRICE BETWEEN */}
          <div className="filters-containers-price">
            <span>Trier par prix</span>
            <span>Prix entre : </span>

            <span>
              <FilterBar filters={filters} setFilters={setFilters} />
            </span>
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
