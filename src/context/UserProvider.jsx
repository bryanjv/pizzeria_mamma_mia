import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const API_URL = "http://localhost:5001";

export default function UserProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [email, setEmail] = useState(() => localStorage.getItem("email"));

  // Persistencia
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (email) localStorage.setItem("email", email);
    else localStorage.removeItem("email");
  }, [email]);

  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return { ok: false, message: data?.message || "Login falló" };
      }

      // Esperado: { token, email }
      setToken(data.token);
      setEmail(data.email);

      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.message || "Error de red" };
    }
  };

  const register = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return { ok: false, message: data?.message || "Registro falló" };
      }

      // Esperado: { token, email }
      setToken(data.token);
      setEmail(data.email);

      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.message || "Error de red" };
    }
  };

  const getProfile = async () => {
    if (!token) return { ok: false, message: "Sin token" };

    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // token inválido o expirado → limpias sesión
        logout();
        return { ok: false, message: data?.message || "No autorizado" };
      }

      // Esperado: { email } (o user con email)
      setEmail(data.email || data.user?.email || email);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, message: err?.message || "Error de red" };
    }
  };

  return (
    <UserContext.Provider
      value={{ token, email, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
