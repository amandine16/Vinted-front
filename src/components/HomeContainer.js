// Pour réaliser ma requête, j'ai besoin : axios, un state pour stocker et intéragir avec mes résultats
import { useState, useEffect } from "react";
import axios from "axios";

const HomeContainer = () => {
  // Articles est à vide au départ
  const [infosArticles, setInfosArticles] = useState([]);
  // Création de la fonction pour lancer la requete axios
  const fetchArticles = async () => {
    // toujours utiliser un trycatch lors d'une requête
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setInfosArticles(response.data.offers);
      console.log(infosArticles);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [infosArticles]);
  return (
    <div className="HomeContainer">
      {infosArticles.map((elem, index) => {
        return (
          <div className="card-article">
            <div className="name-seller"></div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeContainer;
