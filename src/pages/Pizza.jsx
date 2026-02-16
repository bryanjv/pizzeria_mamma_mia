import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Pizza = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPizza = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`http://localhost:5001/api/pizzas/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar la pizza");

        const data = await res.json();
        setPizza(data);
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    getPizza();
  }, [id]);

  if (loading) return <p className="text-center my-5">Cargando pizza...</p>;
  if (error) return <p className="text-center text-danger my-5">{error}</p>;
  if (!pizza) return null;

  return (
    <div className="container my-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={pizza.img}
              alt={pizza.name}
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>

          <div className="col-md-6">
            <div className="card-body">
              <h3 className="card-title fw-bold text-capitalize">{pizza.name}</h3>
              <p className="card-text">{pizza.desc}</p>

              <h6 className="mt-4">Ingredientes:</h6>
              <ul className="list-unstyled text-center">
                {pizza.ingredients.map((ing, idx) => (
                  <li key={idx}>🍕 {ing}</li>
                ))}
              </ul>

              <h4 className="mt-4">Precio: ${pizza.price.toLocaleString()}</h4>

              <button
                className="btn btn-dark mt-3"
                onClick={() =>
                  addToCart({
                    id: pizza.id,
                    name: pizza.name,
                    price: pizza.price,
                    img: pizza.img,
                  })
                }
              >
                🛒 Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
