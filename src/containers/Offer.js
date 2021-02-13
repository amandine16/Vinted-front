import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UserEmptySvg from "../components/user-empty-state";

const Offer = () => {
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const keyDetails = [];

  // REQUEST AXIOS //
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://vinted-projet-backend.herokuapp.com/offer/${id}`
        );
        setArticle(response.data);
        setIsLoading(false);
        console.log(response.data);
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
      <div className="Offer">
        <div className="offerContent">
          {/* PICTURE */}
          <div className="offer-picture">
            {article.product_image && (
              <img src={article.product_image.secure_url} alt="" />
            )}
          </div>

          {/* CARD */}
          <div className="offer-infos">
            <div className="infos-offer">
              <div className="price-offer">{article.product_price} €</div>

              {/* DETAILS */}
              <ul className="details-offer">
                {article.product_details.map((line, index) => {
                  // à chaque boucle, on push dans notre tableau keyDetails, la clef de l'objet bouclé
                  keyDetails.push(Object.keys(line));
                  return (
                    <>
                      {/* IF KEY EXIST */}
                      {line[keyDetails[index]] && (
                        <li key={index} id={index}>
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

            {/* OWNER */}
            <div className="description-offer">
              <p className="name-product">{article.product_name}</p>
              <p className="description">{article.product_description}</p>
              <div className="offer-user">
                {article.owner.account.avatar ? (
                  <img
                    src={article.owner.account.avatar.secure_url}
                    alt={article.owner.account.username}
                  />
                ) : (
                  <UserEmptySvg />
                )}

                <span className="nameSeller-offer">
                  {article.owner.account.username &&
                    article.owner.account.username}
                </span>
              </div>
            </div>
            {/* BTN TO BUY */}
            <button className="btn-buy">Acheter</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
