import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUp = ({ setUser, setUserToken, setInfosUser }) => {
  // State pour le form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [check, setCheck] = useState(false);
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    // useEffect(() => {
    const infoUserInscris = async () => {
      try {
        const response = await axios.post(
          //   "https://lereacteur-vinted-api.herokuapp.com/user/signup"
          "https://vinted-projet-backend.herokuapp.com/user/signup",
          {
            email: email,
            username: username,
            phone: phone,
            password: password,
          }
        );
        // Je stocke dans le state les infos du user
        setInfosUser(response.data);
       
        // Une fois l'inscription réalisée, je redirige vers la page de connexion
        history.push("/user/login");
       
      } catch (error) {
        console.log(error.message);
      }
    };
    infoUserInscris();
  };
  const handleUserName = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleCheck = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <div className="SignUp">
      <h2>S'inscrire</h2>
      <div className="form-signup">
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
        </form>
      </div>
    </div>
  );
};

export default SignUp;
