import Header from "./Header";
import CardPizza from "./CardPizza";
import { useState, useEffect } from "react";

const Home = () => {

  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const getPizzas = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/pizzas/");
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error("Error al cargar pizzas", error);
    }
  };

  getPizzas();
}, []);

  return (
    <>
      <Header />

      <div className="container my-5">
        {loading && <p className="text-center">Cargando pizzas...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row g-4">
          {pizzas.map((pizza) => (
            <div className="col-md-4" key={pizza.id}>
              <CardPizza
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={pizza.img}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
