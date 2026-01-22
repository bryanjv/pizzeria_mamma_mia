import { pizzaCart as initialCart } from "../assets/js/pizzas";
import { useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState(initialCart);

  const handleIncrement = (id) => {
    // Lógica para incrementar la cantidad de un ítem en el carrito
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id) => {
    // Lógica para decrementar la cantidad de un ítem en el carrito
    setCart(
      cart.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item,
      ).filter((item) => item.count > 0),
    );
  };

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4">Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p className="text-center">El carrito está vacío.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => handleDecrement(item.id)}>
                      -
                    </button>

                    {item.count}
                    <button
                      className="btn btn-sm btn-success ms-2"
                      onClick={() => handleIncrement(item.id)}>
                      +
                    </button>
                  </td>
                  <td>${(item.price * item.count).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="text-end fw-bold">
          Total a Pagar: $
          {cart
            .reduce((total, item) => total + item.price * item.count, 0)
            .toLocaleString()}
          <button className="btn btn-primary btn-sm ms-3">Pagar Ahora</button>
        </p>
      </div>
    </>
  );
};

export default Cart;
