import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.username) navigate("/dashboard");
    else setError(result.error);
  };

  return (
    <main className="form-signin w-100 m-auto">
      <br />
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal text-center">Acceso al sistema</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=""
            required
          />
          <label htmlFor="floatingInput">Nombre de usuario</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Iniciar sesión
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </main>
  );
}

export default Login;
