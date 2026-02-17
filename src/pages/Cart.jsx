import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const API_URL = "http://localhost:5001";

const Cart = () => {
  const { cart, increment, decrement, total } = useContext(CartContext);
  const { token } = useContext(UserContext);

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isPaying, setIsPaying] = useState(false);

  const handleCheckout = async () => {
    if (!token) {
      setStatus({ type: "error", message: "Debes iniciar sesión para pagar." });
      return;
    }
    if (cart.length === 0) return;

    try {
      setIsPaying(true);
      setStatus({ type: "", message: "" });

      const res = await fetch(`${API_URL}/api/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Si tu backend espera otro shape, lo ajustamos.
        body: JSON.stringify({ cart}),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data?.message || "No se pudo procesar la compra",
        });
        return;
      }

      setStatus({ type: "success", message: "✅ Compra realizada con éxito" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Error de red",
      });
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Carrito de Compras</h2>

      {status.message && (
        <div
          className={`alert ${
            status.type === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {status.message}
        </div>
      )}

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
                    <img src={item.img} alt={item.name} style={{ width: "80px" }} />
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

          <div className="d-flex justify-content-end align-items-center gap-3 fw-bold">
            <span>Total a Pagar: ${total.toLocaleString()}</span>
            <button
              className="btn btn-primary btn-sm"
              disabled={!token || isPaying}
              onClick={handleCheckout}
            >
              {isPaying ? "Procesando..." : "Pagar Ahora"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
