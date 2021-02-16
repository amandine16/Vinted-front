import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
// STRIPE
// installation de stripe côté front : yarn add yarn add @stripe/react-stripe-js @stripe/stripe-js
// On va lier notre front avec notre back , en envoyant notre clef publique à l'API stripe (il va vérifier si la requete qui est faite avec la clef publique correspond à la  clef secrete du compte qui a fait la requete)
const stripePromise = loadStripe(
  "pk_test_51ILSwIH2s6ZoIO2yi8T4Z58qLmqFeCrtUiYnhmjr1HXD5dMahEcgbrNgESh25d8tKCIOccDd6I4Gslfydo3TE6Ew00pVVlcFuk"
);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
