const Profile = () => {
  const email = "usuario@correo.com"; // por ahora fijo

  return (
    <div className="container my-5 text-center">
      <h2 className="mb-4">Perfil de Usuario</h2>

      <p className="fs-5">
        <strong>Email:</strong> {email}
      </p>

      <button className="btn btn-danger mt-3">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
