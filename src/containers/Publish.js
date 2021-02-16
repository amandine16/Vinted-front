import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ModalPublish from "../components/ModalPublish";

const Publish = ({ userToken, setModalLogin }) => {
  const history = useHistory();

  const [publish, setPublish] = useState({
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    city: "",
    condition: "",
    price: "",
    picture: {},
  });
  const [idPublish, setIdPublish] = useState("");
  const newPublish = { ...publish };
  const [modalPublish, setModalPublish] = useState(false);
  //   PREVIEW IMG UPLOAD
  const [previewImg, setPreviewImg] = useState("");
  // VALUES OF INPUT
  const handlePublish = (e, input) => {
    switch (input) {
      case "title":
        newPublish.title = e.target.value;
        setPublish(newPublish);
        break;
      case "description":
        newPublish.description = e.target.value;
        setPublish(newPublish);
        break;
      case "brand":
        newPublish.brand = e.target.value;
        setPublish(newPublish);
        break;
      case "size":
        newPublish.size = e.target.value;
        setPublish(newPublish);
        break;
      case "color":
        newPublish.color = e.target.value;
        setPublish(newPublish);
        break;
      case "condition":
        newPublish.condition = e.target.value;
        setPublish(newPublish);
        break;
      case "city":
        newPublish.city = e.target.value;
        setPublish(newPublish);
        break;
      case "price":
        newPublish.price = e.target.value;
        setPublish(newPublish);
        break;
      case "picture":
        newPublish.picture = e.target.files[0];
        setPublish(newPublish);
        break;
      default:
        console.log("switch default");
    }
  };

  //   FUNCTION SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    // FORMDATA FOR UPLOAD IMAGE
    const formData = new FormData();
    formData.append("title", publish.title);
    formData.append("brand", publish.brand);
    formData.append("description", publish.description);
    formData.append("size", publish.size);
    formData.append("color", publish.color);
    formData.append("condition", publish.condition);
    formData.append("city", publish.city);
    formData.append("price", publish.price);
    formData.append("picture", publish.picture);
    // REQUEST AXIOS
    try {
      const response = await axios.post(
        "https://vinted-projet-backend.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        setIdPublish(response.data._id);
        idPublish && setModalPublish(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //IF USER CONNECTED
  return userToken ? (
    <div className="Publish">
      <div className="publish-container">
        <h2>Vends tes articles</h2>
        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* PICTURE */}
          <div className="file">
            <div className="dashed">
              {/* PREVIEW IMG */}
              {previewImg ? (
                <div className="previewImg">
                  <img src={previewImg} alt="preview" />
                  <FontAwesomeIcon
                    icon="times-circle"
                    onClick={() => {
                      setPreviewImg("");
                      const newTab = { ...publish };
                      newTab.picture = {};
                      setPublish(newTab);
                    }}
                  />
                </div>
              ) : (
                // UPLOAD IMG
                <div className="input-file">
                  <label htmlFor="file">
                    <FontAwesomeIcon icon="plus" /> Ajoute une photo
                  </label>
                  <input
                    id="file"
                    type="file"
                    onChange={(e) => {
                      handlePublish(e, "picture");
                      setPreviewImg(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="box-publish">
            {/* TITLE */}
            <div className="text-input-publish">
              <label htmlFor="title">Titre</label>
              <input
                id="title"
                type="text"
                required
                value={publish.title}
                placeholder="ex : Chemise Zara"
                onChange={(e) => handlePublish(e, "title")}
              />
            </div>
            {/* DESCRIPTION */}
            <div className="text-input-publish">
              <label htmlFor="description">Décris ton article</label>
              <textarea
                required
                id="description"
                type="text-area"
                placeholder="ex : Porté très peu"
                rows="5"
                value={publish.description}
                onChange={(e) => handlePublish(e, "description")}
              ></textarea>
            </div>
          </div>
          <div className="box-publish">
            {/* BRAND */}
            <div className="text-input-publish">
              <label htmlFor="brand">Marque</label>
              <input
                required
                id="brand"
                type="text"
                value={publish.brand}
                onChange={(e) => handlePublish(e, "brand")}
                placeholder="ex : Zara"
              />
            </div>
            {/* SIZE */}
            <div className="text-input-publish">
              <label htmlFor="size">Taille</label>
              <input
                required
                id="size"
                type="text"
                value={publish.size}
                onChange={(e) => handlePublish(e, "size")}
                placeholder="ex : S / 36"
              />
            </div>
            {/* COLOR */}
            <div className="text-input-publish">
              <label htmlFor="color">Couleur</label>
              <input
                required
                id="color"
                type="text"
                value={publish.color}
                onChange={(e) => handlePublish(e, "color")}
                placeholder="ex : Noir"
              />
            </div>
            {/* CONDITION */}
            <div className="text-input-publish">
              <label htmlFor="condition">État</label>
              <input
                required
                id="condition"
                type="text"
                value={publish.condition}
                onChange={(e) => handlePublish(e, "condition")}
                placeholder="ex : Neuf avec étiquette"
              />
            </div>
            {/* LOCATION */}
            <div className="text-input-publish">
              <label htmlFor="city">Lieu</label>
              <input
                required
                id="city"
                type="text"
                value={publish.city}
                onChange={(e) => handlePublish(e, "city")}
                placeholder="ex : La Rochelle"
              />
            </div>
          </div>
          {/* PRICE */}
          <div className="box-publish">
            <div className="text-input-publish">
              <label htmlFor="price">Prix</label>
              <input
                required
                id="price"
                type="number"
                value={publish.price}
                onChange={(e) => handlePublish(e, "price")}
                placeholder="0,00 €"
              />
            </div>
            <input type="checkbox" />
            <span>Je suis intéressé(e) par les échanges</span>
          </div>
          {/* BTN SUBMIT */}
          <button className="btn btn-green" type="submit">
            Ajouter
          </button>
        </form>
      </div>
      {/* MODAL SUCCESS PUBLISH */}
      {modalPublish && (
        <ModalPublish
          idPublish={idPublish}
          setModalPublish={setModalPublish}
          setPublish={setPublish}
          modalPublish={modalPublish}
          newPublish={newPublish}
        />
      )}
    </div>
  ) : (
    <>
      {/* Si l'utilisateur se déconnecte en étant sur la page publish, il est directement redirigé sur la page d'accueil, avec la modale login ouverte */}
      {history.push("/")}
      {setModalLogin(true)}
    </>
  );
};

export default Publish;
