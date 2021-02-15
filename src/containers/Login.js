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
          // "https://vinted-projet-backend.herokuapp.com/user/login/",
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        if (response.data.token) {
          // J'envoie le token à la fonction qui crée le cookies
          setUser(response.data.token);
          // Une fois la connexion réalisée, je ferme la modal
          setModalLogin(false);
          setErrorMessage("");
          history.push("/publish");
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
    <div className="ModalConnexion">
      <div className="form">
        <div>
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
