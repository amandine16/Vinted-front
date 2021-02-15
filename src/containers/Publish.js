import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Publish = () => {
  const [publish, setPublish] = useState({});
  const newPublish = { ...publish };
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
      case "location":
        newPublish.location = e.target.value;
        setPublish(newPublish);
        break;
      case "price":
        newPublish.price = Number(e.target.value);
        setPublish(newPublish);
        break;
      default:
        console.log("switch default");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="Publish">
      <div className="publish-container">
        <h2>Vends tes articles</h2>
        <form onSubmit={handleSubmit}>
          <div className="file">
            <div className="dashed">
              <div className="input-file">
                <label htmlFor="file">
                  <FontAwesomeIcon icon="plus" /> Ajoute une photo
                </label>
                <input id="file" type="file" />
              </div>
            </div>
          </div>
          <div className="box-publish">
            <div className="text-input-publish">
              <label htmlFor="title">Titre</label>
              <input
                id="title"
                type="text"
                value={publish.title}
                placeholder="ex : Chemise Zara"
                onChange={(e) => handlePublish(e, "title")}
              />
            </div>
            <div className="text-input-publish">
              <label htmlFor="description">Décris ton article</label>
              <textarea
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
            <div className="text-input-publish">
              <label htmlFor="brand">Marque</label>
              <input
                id="brand"
                type="text"
                value={publish.brand}
                onChange={(e) => handlePublish(e, "brand")}
                placeholder="ex : Zara"
              />
            </div>
            <div className="text-input-publish">
              <label htmlFor="size">Taille</label>
              <input
                id="size"
                type="text"
                value={publish.size}
                onChange={(e) => handlePublish(e, "size")}
                placeholder="ex : S / 36"
              />
            </div>
            <div className="text-input-publish">
              <label htmlFor="color">Couleur</label>
              <input
                id="color"
                type="text"
                value={publish.color}
                onChange={(e) => handlePublish(e, "color")}
                placeholder="ex : Noir"
              />
            </div>
            <div className="text-input-publish">
              <label htmlFor="condition">État</label>
              <input
                id="condition"
                type="text"
                value={publish.condition}
                onChange={(e) => handlePublish(e, "condition")}
                placeholder="ex : Neuf avec étiquette"
              />
            </div>
            <div className="text-input-publish">
              <label htmlFor="location">Lieu</label>
              <input
                id="location"
                type="text"
                value={publish.location}
                onChange={(e) => handlePublish(e, "location")}
                placeholder="ex : La Rochelle"
              />
            </div>
          </div>
          <div className="box-publish">
            <div className="text-input-publish">
              <label htmlFor="price">Prix</label>
              <input
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
        </form>
      </div>
    </div>
  );
};

export default Publish;
