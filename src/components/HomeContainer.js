// Pour réaliser ma requête, j'ai besoin : axios, un state pour stocker et intéragir avec mes résultats
import { useState, useEffect } from "react";
// import pour créer des liens vers d'autres pages du site
import { Link } from "react-router-dom";
import axios from "axios";

const HomeContainer = ({ checkOrder, priceMax, priceMin, search, filters }) => {
  // infosArticles est à vide au départ
  const [infosArticles, setInfosArticles] = useState([]);
  // variable qui va passer à false quand la requete sera aboutie
  const [isLoading, setIsLoading] = useState(true);

  //TEST CHECK ORDER PRICE FOR AXIOS REQUEST//
  let request = "";
  // filters.checkOrder
  request = `https://vinted-projet-backend.herokuapp.com/offers/?sort=${filters.checkOrder}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&title=${filters.search}`;
  //https://lereacteur-vinted-api.herokuapp.com/offers/?sort=${filters.checkOrder}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&title=${filters.search}`

  //REQUEST AXIOS//
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(request);
        setInfosArticles(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchArticles();
  }, [request]);

  //RETURN//
  return isLoading ? (
    <span>En cours de chargement ...</span>
  ) : (
    <div className="HomeContainer">
      {infosArticles.map((info, index) => {
        return (
          <Link to={`/offer/${info._id}`} key={index}>
            <div className="card-article" id={info._id} key={index}>
              <div className="owner">
                {info.owner.account.avatar && (
                  <img src={info.owner.account.avatar.secure_url} alt="" />
                )}

                <span>{info.owner.account.username}</span>
              </div>

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
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default HomeContainer;
