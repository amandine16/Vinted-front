import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUp = ({
  setUser,
  setErrorMessage,
  errorMessage,
  setModalSignUp,
  setModalLogin,
}) => {
  //STATE//
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [check, setCheck] = useState(false);
  setErrorMessage("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const infoUserInscris = async () => {
      try {
        const response = await axios.post(
          "https://vinted-projet-backend.herokuapp.com/user/signup",
          // "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          // "http://localhost:3001/user/signup",
          {
            email: email,
            username: username,
            phone: phone,
            password: password,
          }
        );
        if (response.data.token) {
          // Une fois l'inscription réalisée, l'utilisateur est directement connecté et redirigé vers la homepage
          setUser(response.data.token);
          setModalSignUp(false);
          setErrorMessage("");
        }
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
        setErrorMessage("Something went wrong, please try again");

        if (error.response) {
          console.log(error.response.message);
        }
      }
    };
    infoUserInscris();
  };

  //FUNCTION FOR INPUT FORM//
  const handleUserName = (e) => {
    setUsername(e.target.value);
    setErrorMessage("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrorMessage("");
  };
  const handleCheck = (e) => {
    setCheck(e.target.checked);
    setErrorMessage("");
  };

  //FORM//
  return (
    <div className="ModalConnexion">
      <div className="form">
        <div>
          <span>S'inscrire</span>
          <FontAwesomeIcon
            icon="times-circle"
            onClick={() => {
              setModalSignUp(false);
              setErrorMessage("");
            }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <input
            type="text"
            onChange={handleUserName}
            value={username}
            placeholder="Nom d'utilisateur"
          />
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
          {/* phone */}
          <input
            type="text"
            onChange={handlePhone}
            value={phone}
            placeholder="Numéro de téléphone"
          />
          <div className="newLetter-signup">
            <div className="check">
              {/* btn-check-newsletter */}
              <input type="checkbox" checked={check} onChange={handleCheck} />
              <span>S'inscrire à notre newletter</span>
            </div>

            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          {/* btn-inscription */}
          <button type="submit">S'inscrire</button>
          <span style={{ color: "red" }}>{errorMessage}</span>
          {/* LINK TO SIGNUP */}
          <button
            onClick={() => {
              setModalLogin(true);
              setModalSignUp(false);
            }}
          >
            Déjà un compte ?
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
