// Pour réaliser ma requête, j'ai besoin : axios, un state pour stocker et intéragir avec mes résultats
import { useState, useEffect } from "react";
// import pour créer des liens vers d'autres pages du site
import { Link } from "react-router-dom";
import axios from "axios";
import UserEmptySvg from "./user-empty-state";

const HomeContainer = ({
  filters,
  messageNotFoundArticles,
  setMessageNotFoundArticles,
}) => {
  // infosArticles est à vide au départ
  const [infosArticles, setInfosArticles] = useState([]);
  // variable qui va passer à false quand la requete sera aboutie
  const [isLoading, setIsLoading] = useState(true);

  //TEST CHECK ORDER PRICE FOR AXIOS REQUEST//
  let request = "";
  request = `https://vinted-projet-backend.herokuapp.com/offers/?sort=${filters.checkOrder}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&title=${filters.search}`;
  // request = `https://lereacteur-vinted-api.herokuapp.com/offers/?sort=${filters.checkOrder}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&title=${filters.search}`;

  //REQUEST AXIOS//
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(request);
        setInfosArticles(response.data.offers);
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
    <span>En cours de chargement ...</span>
  ) : (
    <div className="HomeContainer">
      {/* MESSAGE ARTICLE NOT FOUND */}
      {messageNotFoundArticles && (
        <div className="notFoundArticles">{messageNotFoundArticles}</div>
      )}
      {/* ARTICLES */}
      {infosArticles.map((info, index) => {
        return (
          <div className="card-article" id={info._id} key={index}>
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
            <Link to={`/offer/${info._id}`} key={index}>
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
  );
};

export default HomeContainer;
