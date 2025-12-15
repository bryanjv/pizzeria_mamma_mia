import PropTypes from "prop-types";

const CardPizza = ({ name, price, ingredients, img }) => {
  return (
    <div className="card h-100">
      <img src={img} className="card-img-top" alt={name} />

      <div className="card-body">
        <h5 className="card-title fw-bold">Pizza {name}</h5>
        <hr />

        <p className="text-muted text-center mb-2">Ingredientes:</p>
        <p className="text-center">🍕 {ingredients.join(", ")}</p>

        <hr />
        <h5 className="text-center fw-bold">
          Precio: ${price.toLocaleString()}
        </h5>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <button className="btn btn-outline-dark btn-sm">👀 Ver Más</button>
        <button className="btn btn-dark btn-sm">🛒 Añadir</button>
      </div>
    </div>
  );
};

CardPizza.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default CardPizza;
