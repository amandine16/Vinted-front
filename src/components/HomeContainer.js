// Pour réaliser ma requête, j'ai besoin : axios, un state pour stocker et intéragir avec mes résultats
import { useState, useEffect } from "react";
// import pour créer des liens vers d'autres pages du site
import { Link } from "react-router-dom";
import axios from "axios";

const HomeContainer = () => {
  // infosArticles est à vide au départ
  const [infosArticles, setInfosArticles] = useState([]);
  // variable qui va passer à false quand la requete sera aboutie
  const [isLoading, setIsLoading] = useState(true);

  // useEffect nous permet de lancer la requete qu'une seule fois
  useEffect(() => {
    // Fonction qui lance la requete axios
    const fetchArticles = async () => {
      // toujours utiliser un trycatch lors d'une requête
      try {
        // Création de la requete axios
        const response = await axios.get(
          // "https://lereacteur-vinted-api.herokuapp.com/offers"
          "https://vinted-projet-backend.herokuapp.com/offers/"
        );
        setInfosArticles(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchArticles();
  }, []);
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
