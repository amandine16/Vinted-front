import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //  Etape 1 :  Récupèrer les données bancaires saisies par le user
      const cardElements = elements.getElement(CardElement);
      // Etape 2 : Envoyer les données à l'API Stripe pour récupérer le token
      const stripeResponse = await stripe.createToken(cardElements, {
        name: "",
      });
      const stripeToken = stripeResponse.token.id;
      // Etape 3 : Faire la requête vers mon serveur pour effectuer la transaction, avec le token récupéré côté client
      const response = await axios.post(
        "https://vinted-projet-backend.herokuapp.com/payment",
        {
          stripeToken,
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setSucceeded(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!succeeded ? (
        <div className="CheckoutForm">
          <form onSubmit={handleSubmit}>
            {/* Input avec le numéro de CB + CCV */}
            <CardElement />
            <button type="submit">Acheter</button>
          </form>
        </div>
      ) : (
        <span>Paiment validé ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
