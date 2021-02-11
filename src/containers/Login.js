import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser, setUserToken, setInfosUser }) => {
  // State pour le form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const LoginRequest = async () => {
      try {
        const response = await axios.post(
          //   "https://lereacteur-vinted-api.herokuapp.com/user/login"
          "https://vinted-projet-backend.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        // Je récupère toutes les infos du user connecté
        setInfosUser(response.data);
        // Je stocke le token dans le state
        const token = response.data.token;
        setUserToken(token);
        // J'envoie le token à la fonction qui crée le cookies
        setUser(token);
        // Une fois la connexion réalisée, je redirige vers la page d'accueil
        history.push("/");
      } catch (error) {
        console.log(error.message);
      }
    };
    LoginRequest();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <h2>Se connecter</h2>
      <div className="form-login">
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
        </form>
      </div>
    </div>
  );
};

export default Login;
