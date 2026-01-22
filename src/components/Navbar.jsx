import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

const Navbar = () => {
  const total = 25000;
  const token = false;

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link to="/" className="navbar-brand fw-bold text-decoration-none">
        🍕 Pizzería Mamma Mía!
      </Link>

      <div className="d-flex gap-2">
        <Link to="/" className="btn btn-outline-light btn-sm">
          🏠 Home
        </Link>

        {token ? (
          <>
            <Link to="/profile" className="btn btn-outline-light btn-sm">
              🔓 Profile
            </Link>
            <button className="btn btn-outline-light btn-sm">
              🔒 Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light btn-sm">
              🔐 Login
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-sm">
              🔐 Register
            </Link>
          </>
        )}
      </div>

      <Link to="/cart" className="btn btn-outline-info btn-sm ms-auto">
        🛒 Total: ${formatCurrency(total)}
      </Link>
    </nav>
  );
};

export default Navbar;
