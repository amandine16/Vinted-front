import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Publish = () => {
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
              <input id="title" type="text" placeholder="ex : Chemise Zara" />
            </div>
            <div className="text-input-publish">
              <label htmlFor="description">Décris ton article</label>
              <input
                id="description"
                type="text"
                placeholder="ex : Porté très peu"
              />
            </div>
          </div>
          <div className="box-publish"></div>
          <div className="box-publish"></div>
        </form>
      </div>
    </div>
  );
};

export default Publish;
