import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const ModalPublish = ({ idPublish, setModalPublish }) => {
  const history = useHistory();
  console.log(idPublish);
  const handleOtherPublish = () => {
    setModalPublish(false);
  };

  return (
    <div className="Modal">
      <div className="modal-content">
        <div className="header-modal">
          <h2>Offre publiée !</h2>
          {/* BUTTON CLOSE MODAL */}
          <span onClick={() => setModalPublish(false)}>
            <FontAwesomeIcon icon="times-circle" />{" "}
          </span>
        </div>
        <div className="choice-btn">
          {/* BTN TO GO OFFER */}
          <button
            className="btn btn-green"
            onClick={() => history.push(`/offer/${idPublish}`)}
          >
            Voir mon annonce
          </button>
          {/* BTN PUBLISH OTHER ADVERT */}
          <button className="btn btn-green" onClick={handleOtherPublish}>
            Publiez d'autres annonces
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPublish;
