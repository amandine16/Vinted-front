import { Link } from "react-router-dom";
import logoVinted from "../assets/img/logo-vinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUp from "../containers/SignUp";
import Login from "../containers/Login";
import { useHistory } from "react-router-dom";

const Header = ({
  userToken,
  setUser,
  filters,
  setFilters,
  errorMessage,
  setErrorMessage,
  modalLogin,
  modalSignUp,
  setModalLogin,
  setModalSignUp,

  fromModal,
  setFromModal,
}) => {
  const history = useHistory();

  // FUNCTION FOR FILTERS
  const handleChange = (e) => {
    const newFilters = { ...filters };
    newFilters.search = e.target.value;
    console.log(newFilters);
    setFilters(newFilters);
  };

  const handleClik = (typeModal) => {
    if (typeModal === "signUp") {
      modalSignUp ? setModalSignUp(false) : setModalSignUp(true);
    } else if (typeModal === "login") {
      modalLogin ? setModalLogin(false) : setModalLogin(true);
    }
  };

  // RETURN //
  return (
    <div className="Header">
      <div className="topHeader">
        <Link to="/">
          <div className="logo-vinted">
            <img src={logoVinted} alt="logo Vinted" />
          </div>
        </Link>
        {/* SEARCH */}
        <div className="input-search">
          <input
            type="text"
            value={filters.search}
            onChange={handleChange}
            placeholder="Rechercher des articles"
          />
          <FontAwesomeIcon icon="search" />
        </div>
        <div className="connexion-container">
          {/* IF TOKEN EXIST => BTN DECONNEXION*/}
          {userToken ? (
            <button
              className="btn btn-deconnexion"
              onClick={() => setUser(null)}
            >
              Deconnexion
            </button>
          ) : (
            <>
              <button
                className="btn btn-green btn-signup-header"
                onClick={() => handleClik("signUp")}
              >
                S'inscrire
              </button>

              <button
                className="btn btn-green btn-login-header"
                onClick={() => handleClik("login")}
              >
                Se connecter
              </button>
            </>
          )}
        </div>
        {/*  BUTTON SELL ARTICLE */}
        <div className="btn btn-buy">
          <button
            className="btn btn-green btn-buy-header"
            onClick={() => {
              userToken ? history.push("/publish") : setModalLogin(true);
            }}
          >
            Vends tes articles
          </button>
        </div>
      </div>
      {/* MODAL */}
      {modalSignUp && (
        <SignUp
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          setModalSignUp={setModalSignUp}
          setModalLogin={setModalLogin}
        />
      )}
      {modalLogin && (
        <Login
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          setModalLogin={setModalLogin}
          setModalSignUp={setModalSignUp}
          fromModal={fromModal}
          setFromModal={setFromModal}
        />
      )}
    </div>
  );
};

export default Header;
