import "./App.scss";
import "./assets/css/font.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Header from "./components/Header";
import Login from "./containers/Login";
import { useState } from "react";

function App() {
  // Ici je stocke le token du user, et je le crée ici car je vais en avoir besoin dans différentes pages
  const [userToken, setUserToken] = useState(
    Cookies.get("CookieUserToken") || null
  );

  // State de msg d'erreur pour login + signup
  const [errorMessage, setErrorMessage] = useState("");

  const setUser = (token) => {
    if (token) {
      // Je crée le Cookie
      Cookies.set("CookieUserToken", token, { expires: 7 });
      // je mets à jour le state token, pour etre dispo dans les autres pages
      setUserToken(token);
    } else {
      // Je supprime le cookie quand l'utilisateur se deconnecte
      Cookies.remove("CookieUserToken");
      setUserToken(null);
    }
  };
  return (
    <Router>
      {/* J'envoie à mon header, la fonction et mon token */}
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/user/signup/">
          <SignUp
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setUser={setUser}
          />
        </Route>
        <Route path="/user/login/">
          <Login
            setUser={setUser}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
