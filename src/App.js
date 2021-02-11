import "./App.scss";
import "./assets/css/font.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  // Ici je stock le token du user, et je le crée ici car je vais en avoir besoin dans différentes pages
  const [userToken, setUserToken] = useState();
  const setUser = (token) => {
    if (token) {
      // j'ajoute le token dans le cookie
      console.log("token reçu");
    } else {
      // sinon je supprime le cookie
      console.log("token non existant");
    }
  };
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/user/signup/">
          <SignUp setUser={setUser} setUserToken={setUserToken} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
