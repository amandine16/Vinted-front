// Pour réaliser ma requête, j'ai besoin : axios, un state pour stocker et intéragir avec mes résultats
import { useState, useEffect } from "react";
import axios from "axios";

const HomeContainer = () => {
  // Articles est à vide au départ
  const [infosArticles, setInfosArticles] = useState([]);
  // Création de la fonction pour lancer la requete axios

  useEffect(() => {
    const fetchArticles = async () => {
      // toujours utiliser un trycatch lors d'une requête
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setInfosArticles(response.data.offers);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchArticles();
  }, []);
  console.log(infosArticles);
  return (
    <div className="HomeContainer">
      {infosArticles.map((info, index) => {
        // console.log(info.owner);
        return (
          <div className="card-article" id={info.id} key={info._id}>
            {/* {info.owner((owner, index) => { */}
            {/* return ( */}
            <div className="owner">
              <div className="avatar-seller"></div>
              <div className="name-seller"></div>
            </div>
            {/* ); */}
            {/* })} */}

            <div className="product_name">{info.product_name}</div>
            <div className="product_price">{info.price}</div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeContainer;
