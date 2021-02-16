import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserEmptySvg from "../components/user-empty-state";
import Cookies from "js-cookie";

const Offer = ({ setModalLogin, fromModal, setFromModal }) => {
  const history = useHistory();
  // ID USER
  const idUser = Cookies.get("CookieUserId");
  // TOKEN USER
  const tokenUser = Cookies.get("CookieUserToken");
  // ID OFFER
  const { id } = useParams();
  // ALL INFOS ARTICLE (id include)
  const [article, setArticle] = useState();
  // IS LOADING
  const [isLoading, setIsLoading] = useState(true);
  const keyDetails = [];

  const handleBuy = () => {
    if (tokenUser && idUser) {
      history.push("/payment", { article });
    } else {
      // OPEN MODAL LOGIN
      setModalLogin(true);
      // SEND ALL INFO OFFER pour être redirigé ensuite, une fois connecté, vers ma page d'offre
      const newFromModal = { ...fromModal };
      newFromModal.from = "offer";
      newFromModal.infoOffer = article;
      setFromModal(newFromModal);
    }
  };

  // REQUEST AXIOS //
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://vinted-projet-backend.herokuapp.com/offer/${id}`
          // `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        if (response.data) {
          setArticle(response.data);
          setIsLoading(false);
        }
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
          <div className="left">
            {/* PICTURE */}
            <div
              className="offer-picture"
              style={{
                height: article.product_pictures.length <= 1 && "500px",
              }}
            >
              {article.product_image && (
                <img src={article.product_image.secure_url} alt="" />
              )}
            </div>
            {/* Carroussel */}
            {article.product_pictures.length >= 2 && (
              <div className="carrou">
                <div className="carroussel-offer">
                  <ul>
                    {article.product_pictures.length >= 2 &&
                      article.product_pictures.map((img, i) => {
                        return (
                          <li className="carousel">
                            <img
                              src={article.product_pictures[i].secure_url}
                              alt=""
                            />
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="rigth">
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
                            <div>{keyDetails[index]}</div>
                            <div>{line[keyDetails[index]]}</div>
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
              <button className="btn btn-green btn-buy" onClick={handleBuy}>
                Acheter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
