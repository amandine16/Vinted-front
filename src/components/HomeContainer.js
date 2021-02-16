// Pour réaliser ma requête, j'ai besoin : axios, un state pour stocker et intéragir avec mes résultats
import { useState, useEffect } from "react";
// import pour créer des liens vers d'autres pages du site
import { Link } from "react-router-dom";
import axios from "axios";
import UserEmptySvg from "./user-empty-state";

const HomeContainer = ({
  filters,
  setFilters,
  messageNotFoundArticles,
  setMessageNotFoundArticles,
}) => {
  // infosArticles est à vide au départ
  const [infosArticles, setInfosArticles] = useState([]);
  // variable qui va passer à false quand la requete sera aboutie
  const [isLoading, setIsLoading] = useState(true);

  // PAGINATION
  const selectNbResults = (e) => {
    // Change nb de resultats par page, et affiche la page 1
    const newLimit = { ...filters };
    newLimit.limit = e.target.value;
    newLimit.page = 1;
    setFilters(newLimit);
  };
  let nbDePageTotal = Math.ceil(infosArticles.count / filters.limit);
  let tabPage = [];
  for (let i = 1; i <= nbDePageTotal; i++) {
    tabPage.push(i);
  }

  //TEST CHECK ORDER PRICE FOR AXIOS REQUEST//
  let request = "";
  request = `https://vinted-projet-backend.herokuapp.com/offers/?sort=${filters.checkOrder}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&title=${filters.search}&page=${filters.page}&limit=${filters.limit}`;
  // request = `https://lereacteur-vinted-api.herokuapp.com/offers/?sort=${filters.checkOrder}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&title=${filters.search}&page=${filters.page}&limit=${filters.limit}`;
  // request = `http://localhost:3001/offers/?sort=${filters.checkOrder}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&title=${filters.search}&page=${filters.page}&limit=${filters.limit}`;

  //REQUEST AXIOS//
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(request);
        setInfosArticles(response.data);
        setIsLoading(false);
        if (Object.keys(response.data.offers).length === 0) {
          setMessageNotFoundArticles(
            "Aucun article ne correspond à votre recherche"
          );
        } else {
          setMessageNotFoundArticles("");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchArticles();
  }, [request, setMessageNotFoundArticles]);

  //RETURN//
  return isLoading ? (
    <div className="center">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      <span>En attente ...</span>
    </div>
  ) : (
    <div className="HomeContainer">
      {/* NB RESULT A AFFICHER */}
      <div className="NbArticleSelected">
        <label htmlFor="selectNbResult">Nombre de résultats à afficher :</label>

        <select id="selectNbResult" defaultValue="5" onChange={selectNbResults}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value={infosArticles.count}>Tout</option>
        </select>
      </div>
      <div className="homeOffers">
        {/* MESSAGE ARTICLE NOT FOUND */}
        {messageNotFoundArticles && (
          <div className="notFoundArticles">{messageNotFoundArticles}</div>
        )}

        {/* ARTICLES */}
        {infosArticles.offers.map((info, index) => {
          return (
            <div className="card-article" id={info._id} key={info._id}>
              <div className="owner">
                {info.owner.account.avatar ? (
                  <img
                    src={info.owner.account.avatar.secure_url}
                    alt={info.owner.account.username}
                  />
                ) : (
                  <UserEmptySvg />
                )}

                <span>{info.owner.account.username}</span>
              </div>
              <Link to={`/offer/${info._id}`} key={info._id}>
                <div className="product-picture-infos">
                  <img src={info.product_image.secure_url} alt="" />
                  <div className="product_size-brand-price">
                    <span>{info.product_price ? info.product_price : 0} €</span>
                    <span>{info.product_details[1].TAILLE}</span>
                    <span>
                      {info.product_details[0].MARQUE
                        ? info.product_details[0].MARQUE
                        : "SANS MARQUE"}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <ul>
          {/* Numéro des pages disponibles */}
          {tabPage.map((numeroDePage, i) => {
            return (
              <li
                key={i}
                style={{
                  color: i + 1 === filters.page && "white",
                  backgroundColor: i + 1 === filters.page && "#29ADB6",
                }}
                onClick={() => {
                  let newPage = { ...filters };
                  newPage.page = i + 1;
                  setFilters(newPage);
                }}
              >
                {numeroDePage}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HomeContainer;
