import "./assets/css/font.css";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import { useState } from "react";
// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faTimesCircle);

function App() {
  // TOKEN IR FOR USE DIFFERENT PAGE
  const [userToken, setUserToken] = useState(
    Cookies.get("CookieUserToken") || null
  );

  // State pour afficher message quand aucun article trouvé
  const [messageNotFoundArticles, setMessageNotFoundArticles] = useState("");

  // Mes filtres par defaut
  const [filters, setFilters] = useState({
    checkOrder: "price-asc",
    priceMin: 0,
    priceMax: 100,
    search: "",
  });

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
      <Header
        userToken={userToken}
        setUser={setUser}
        setFilters={setFilters}
        filters={filters}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />

      <Switch>
        <Route path="/offer/:id" component={Offer}>
          {/* <Offer /> */}
        </Route>
        <Route path="/">
          <Home
            filters={filters}
            messageNotFoundArticles={messageNotFoundArticles}
            setMessageNotFoundArticles={setMessageNotFoundArticles}
            setFilters={setFilters}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
