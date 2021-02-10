import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const Offer = () => {
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const keyDetails = [];
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setArticle(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchArticle();
  }, [id]); // à chaque fois que je change l'id , je veux relancer la requete

  return isLoading ? (
    <span>En chargement ...</span>
  ) : (
    <>
      <Header />
      <div className="Offer">
        <div className="offerContent">
          {/* photo de l'annonce */}
          <div className="offer-picture">
            <img src={article.product_image.secure_url} alt="" />
          </div>

          {/* card d'infos de l'annonce */}
          <div className="offer-infos">
            <div className="infos-offer">
              <div className="price-offer">{article.product_price} €</div>

              {/* details de l'offre qu'on map car c'est un tableau */}
              <ul className="details-offer">
                {article.product_details.map((line, index) => {
                  // à chaque boucle, on push dans notre tableau keyDetails, la clef de l'objet bouclé
                  keyDetails.push(Object.keys(line));
                  return (
                    <>
                      {/* si la clef existe, alors j'affiche la clef + sa valeur */}
                      {line[keyDetails[index]] && (
                        <li>
                          <span>{keyDetails[index]}</span>
                          <span>{line[keyDetails[index]]}</span>
                        </li>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>

            <div className="separator"></div>
            {/* Info sur le vendeur */}
            <div className="description-offer">
              <p className="name-product">{article.product_name}</p>
              <p className="description">{article.product_description}</p>
              <div className="offer-user">
                <img
                  src={
                    article.owner.account.avatar &&
                    article.owner.account.avatar.secure_url
                  }
                  alt={
                    article.owner.account.username &&
                    article.owner.account.username
                  }
                />
                <span className="nameSeller-offer">
                  {article.owner.account.username &&
                    article.owner.account.username}
                </span>
              </div>
            </div>
            {/* bouton Acheter */}
            <button>Acheter</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
