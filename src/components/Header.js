import { Link } from "react-router-dom";
import logoVinted from "../assets/img/logo-vinted.png";

const Header = ({
  userToken,
  setUser,
  setCheckOrder,
  checkOrder,
  priceMax,
  priceMin,
  setPriceMin,
  setPriceMax,
  setSearch,
  search,
  filters,
  setFilters,
}) => {
  const handleChange = (input, e) => {
    if (input === "inputSearch") {
      setSearch(e);
      const newFilters = { ...filters };
      newFilters.search = search;
      setFilters(newFilters);
    }
    if (input === "inputPriceMin") {
      setPriceMin(e);
      const newFilters = { ...filters };
      newFilters.priceMin = priceMin;
      setFilters(newFilters);
    }
    if (input === "inputPriceMax") {
      setPriceMax(e);
      const newFilters = { ...filters };
      newFilters.priceMax = priceMax;
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
              value={search}
              onChange={(e) => handleChange("inputSearch", e.target.value)}
              placeholder="Rechercher des articles"
            />
          </div>

          {/* CHECKBOX ORDER-PRICE */}
          <span className="checkbox-order-price">
            <div
              className="btn-price-order-container"
              onClick={() => {
                setCheckOrder(
                  checkOrder === "price-asc"
                    ? (setCheckOrder = "price-desc")
                    : (setCheckOrder = "price-asc")
                );
                const newFilters = { ...filters };
                checkOrder === "price-asc"
                  ? (newFilters.checkOrder = "price-desc")
                  : (newFilters.checkOrder = "price-asc");
                setFilters(newFilters);
              }}
            >
              <div
                className="knob"
                style={{ left: checkOrder === "price-asc" ? 2 : 23 }}
              >
                {checkOrder === "price-desc" ? <span>⇣</span> : <span>⇡</span>}
              </div>
            </div>
          </span>

          {/* PRICE BETWEEN */}
          <div className="filters-containers-price">
            <span>Trier par prix</span>
            <span>Prix entre : </span>
            <div className="price-between">
              <input
                type="text"
                value={priceMin}
                onChange={(e) => handleChange("inputPriceMin", e.target.value)}
              />
              <input
                type="text"
                value={priceMax}
                onChange={(e) => handleChange("inputPriceMax", e.target.value)}
              />
            </div>

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
