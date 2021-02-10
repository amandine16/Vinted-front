import logoVinted from "../assets/img/logo-vinted.png";

const TopHeader = () => {
  return (
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
        <button>S'inscrire</button>
        <button>Se connecter</button>
      </div>
      <div className="btn-buy">
        <button>Vends tes articles</button>
      </div>
    </div>
  );
};

export default TopHeader;
