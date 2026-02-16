import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, increment, decrement, total } = useContext(CartContext);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="text-center">El carrito está vacío.</p>
      ) : (
        <>
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
                      onClick={() => decrement(item.id)}
                    >
                      -
                    </button>

                    {item.count}

                    <button
                      className="btn btn-sm btn-success ms-2"
                      onClick={() => increment(item.id)}
                    >
                      +
                    </button>
                  </td>
                  <td>${(item.price * item.count).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-end fw-bold">
            Total a Pagar: ${total.toLocaleString()}
            <button className="btn btn-primary btn-sm ms-3">Pagar Ahora</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Cart;
