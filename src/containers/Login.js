import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const Login = ({
  setUser,
  setErrorMessage,
  errorMessage,
  setModalLogin,
  setModalSignUp,
  fromModal,
  setFromModal,
}) => {
  // State pour le form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const LoginRequest = async () => {
      try {
        const response = await axios.post(
          "https://vinted-projet-backend.herokuapp.com/user/login/",
          // "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        if (response.data.token) {
          // J'envoie le token à la fonction qui crée le cookies + l'id pour le stocker aussi dans un cookie
          setUser(response.data.token, response.data._id);
          // Une fois la connexion réalisée, je ferme la modal
          setModalLogin(false);
          // Message d'erreur mise à vide
          setErrorMessage("");
          // si la modale proviens de la page offer, je redirige directement vers le paiement de l'article
          if (fromModal.from === "offer") {
            const article = fromModal.infoOffer;
            history.push("/payment", { article });
            const newFrom = { ...fromModal };
            newFrom.from = "";
            newFrom.infoOffer = "";
            setFromModal(newFrom);
          } else {
            // Sinon je redirige vers la page home (pour le moment)
            history.push("/");
          }
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage("Something went wrong, please try again");
        if (error.response) {
          console.log(error.response.message);
        }
      }
    };
    LoginRequest();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  return (
    <div className="Modal">
      <div className="modal-content">
        <div className="header-modal">
          <span>Se connecter</span>
          <FontAwesomeIcon
            icon="times-circle"
            onClick={() => {
              setModalLogin(false);
              setErrorMessage("");
            }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            onChange={handleEmail}
            value={email}
            placeholder="Email"
          />
          {/* Pass */}
          <input
            type="password"
            onChange={handlePassword}
            value={password}
            placeholder="Mot de passe"
          />

          {/* btn-connexion */}
          <button type="submit">Se connecter</button>
          {/* LINK TO LOGIN */}
          <button
            onClick={() => {
              setModalLogin(false);
              setModalSignUp(true);
            }}
          >
            Pas encore inscrit ?
          </button>
        </form>
        <span style={{ color: "red" }}>{errorMessage}</span>
      </div>
    </div>
  );
};

export default Login;
