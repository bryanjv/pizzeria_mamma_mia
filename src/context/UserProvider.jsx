import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function UserProvider({ children }) {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    return saved === null ? true : saved === "true";
  });

  const logout = () => setToken(false);
  const login = () => setToken(true);

  useEffect(() => {
    localStorage.setItem("token", String(token));
  }, [token]);

  return (
    <UserContext.Provider value={{ token, logout, login }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
