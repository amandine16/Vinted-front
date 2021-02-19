import "./assets/css/font.css";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import { useState } from "react";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";
// FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faTimesCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faTimesCircle, faPlus);

function App() {
  // STATE FOR COOKIE
  const [userToken, setUserToken] = useState(
    Cookies.get("CookieUserToken") || null
  );
  const [userId, setUserId] = useState(Cookies.get("CookieUserId") || null);
  console.log(userId);
  // STATE FOR MODAL
  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  // fromModal permet de rediriger le user, une fois la connexion réalisée, en fonction de la page dont il provient
  const [fromModal, setFromModal] = useState({ from: "", infoOffer: "" });
  // State pour afficher message quand aucun article trouvé
  const [messageNotFoundArticles, setMessageNotFoundArticles] = useState("");

  // Mes filtres par defaut
  const [filters, setFilters] = useState({
    checkOrder: "price-asc",
    priceMin: 0,
    priceMax: 500,
    search: "",
    page: 1,
    limit: 10,
  });

  // State de msg d'erreur pour login + signup
  const [errorMessage, setErrorMessage] = useState("");

  const setUser = (token, id) => {
    if ((token, id)) {
      // Je crée le Cookie
      Cookies.set("CookieUserToken", token, { expires: 7 });
      Cookies.set("CookieUserId", id, { expires: 7 });

      // je mets à jour le state token, pour etre dispo dans les autres pages
      setUserToken(token);
      setUserId(id);
    } else {
      // Je supprime le cookie quand l'utilisateur se deconnecte
      Cookies.remove("CookieUserToken");
      Cookies.remove("CookieUserId");
      setUserToken(null);
      setUserId(null);
    }
  };
  return (
    <Router>
      <Header
        userToken={userToken}
        setUser={setUser}
        setFilters={setFilters}
        filters={filters}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        setModalLogin={setModalLogin}
        setModalSignUp={setModalSignUp}
        modalSignUp={modalSignUp}
        modalLogin={modalLogin}
        fromModal={fromModal}
        setFromModal={setFromModal}
      />

      <Switch>
        <Route path="/offer/:id">
          <Offer
            setModalLogin={setModalLogin}
            fromModal={fromModal}
            setFromModal={setFromModal}
          />
        </Route>
        <Route path="/publish">
          <Publish
            userToken={userToken}
            setModalLogin={setModalLogin}
            modalLogin={modalLogin}
          />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
          <Home
            filters={filters}
            messageNotFoundArticles={messageNotFoundArticles}
            setMessageNotFoundArticles={setMessageNotFoundArticles}
            setFilters={setFilters}
            setModalLogin={setModalLogin}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
