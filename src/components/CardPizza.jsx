import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CardPizza = ({ id, name, price, ingredients, img }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card h-100">
      <img src={img} className="card-img-top" alt={name} />

      <div className="card-body">
        <h5 className="card-title fw-bold">Pizza {name}</h5>
        <hr />

        <p className="text-muted text-center mb-2">🍕 Ingredientes:</p>
        <ul className="list-unstyled text-center">
          {ingredients.map((ingredient, index) => (
            <li key={index}>• {ingredient}</li>
          ))}
        </ul>

        <hr />
        <h5 className="text-center fw-bold">
          Precio: ${price.toLocaleString()}
        </h5>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <Link to={`/pizza/${id}`} className="btn btn-outline-dark btn-sm">
          👀 Ver Más
        </Link>

        <button
          className="btn btn-dark btn-sm"
          onClick={() => addToCart({ id, name, price, img })}>
          🛒 Añadir
        </button>
      </div>
    </div>
  );
};

CardPizza.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default CardPizza;
