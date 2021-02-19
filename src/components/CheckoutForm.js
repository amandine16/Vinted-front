import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const CheckoutForm = ({ article }) => {
  // Rcupérer l'id du user pour le relier au paiement
  const idUser = Cookies.get("CookieUserId");

  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const insurance = 0.3;
  const delivery = 1.99;
  const total = (succeeded + insurance + delivery).toFixed(2);
  const keyDetails = [];

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //  Etape 1 :  Récupèrer les données bancaires saisies par le user
      const cardElements = elements.getElement(CardElement);
      // Etape 2 : Envoyer les données à l'API Stripe pour récupérer le token
      const stripeResponse = await stripe.createToken(cardElements, {
        name: idUser,
      });
      console.log(`id user : ${idUser}`);

      // if (stripeResponse) {
      const stripeToken = stripeResponse.token.id;
      console.log(`stripeToken : ${stripeToken}`);
      // Etape 3 : Faire la requête vers mon serveur pour effectuer la transaction, avec le token récupéré côté client
      const response = await axios.post(
        "https://vinted-projet-backend.herokuapp.com/payment",
        // "http://localhost:3001/payment",
        {
          token: stripeToken,
          title: article.product_name,
          amount: article.product_price,
        }
      );
      console.log(`response.status : ${response.status}`);
      if (response.status === 200) {
        setSucceeded(true);
      }
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!succeeded ? (
        <div className="CheckoutForm">
          <div className="resumeLeft">
            <span>Commande</span>
            <div className="separator"></div>
            <div className="resumeDetails">
              <div className="pictureDetails">
                {/* img article */}
                <img
                  src={article.product_image.secure_url}
                  alt={article.product_name}
                />
                {/* details */}
                <div className="details">
                  <span>{article.product_name}</span>

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
              </div>

              {/* prix */}
              <div>
                <span>{article.product_price} €</span>
              </div>
            </div>
          </div>
          <div className="cardPayment">
            <div className="title">Résumé de la commande</div>
            <div className="resumeCommand">
              <div className="inputOrdered">
                <span>Prix de(s) article(s)</span>
                <span>{article.product_price} €</span>
              </div>
              <div className="inputOrdered">
                <span>Frais d'assurance acheteur</span>
                <span>{insurance} €</span>
              </div>
              <div className="inputOrdered">
                <span>Frais de port</span>
                <span>{delivery} €</span>
              </div>
            </div>
            <div className="separator"></div>
            <div className="totalOrdered">
              <span>Total</span>
              <span>{total} €</span>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Input avec le numéro de CB + CCV */}
              <CardElement />
              <button className="btn btn-green" type="submit">
                Acheter
              </button>
            </form>
          </div>
        </div>
      ) : (
        <span>Paiment validé ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
