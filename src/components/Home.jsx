import Header from "./Header";
import CardPizza from "./CardPizza";
import { pizzas } from "../assets/js/pizzas";

const Home = () => {

  return (
    <>
      <Header />

      <div className="container my-5">
        <div className="row g-4">
          {pizzas.map((pizza)  =>
            <div className="col-md-4" key={pizza.id}>
              <CardPizza
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={pizza.img}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
