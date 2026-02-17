import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { email, logout, getProfile } = useContext(UserContext);
  const [error, setError] = useState("");

  useEffect(() => {
    // refresca email desde /me (por si el storage estaba viejo)
    (async () => {
      const result = await getProfile();
      if (!result.ok && result.message) setError(result.message);
    })();
  }, [getProfile]);

  return (
    <div className="container my-5 text-center">
      <h2 className="mb-4">Perfil de Usuario</h2>

      {error && <p className="text-danger">{error}</p>}

      <p className="fs-5">
        <strong>Email:</strong> {email || "—"}
      </p>

      <button className="btn btn-danger mt-3" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
