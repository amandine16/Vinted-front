import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  return <div className="Offer">Offer {id}</div>;
};

export default Offer;
