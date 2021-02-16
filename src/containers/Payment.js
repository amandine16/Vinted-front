import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

// On va lier notre front avec notre back , en envoyant notre clef publique à l'API stripe (il va vérifier si la requete qui est faite avec la clef publique correspond à la  clef secrete du compte qui a fait la requete)
const stripePromise = loadStripe(
  "pk_test_51ILSwIH2s6ZoIO2yi8T4Z58qLmqFeCrtUiYnhmjr1HXD5dMahEcgbrNgESh25d8tKCIOccDd6I4Gslfydo3TE6Ew00pVVlcFuk"
);

const Payment = () => {
  const history = useHistory();
  const tokenUser = Cookies.get("CookieUserToken");
  const location = useLocation();
  const { article } = location.state;

  return (
    <>
      {tokenUser ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm article={article} />
        </Elements>
      ) : (
        history.push("/")
      )}
    </>
  );
};

export default Payment;
