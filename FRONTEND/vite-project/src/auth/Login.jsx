import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import styles from "./Login.module.css";

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
    <main className={styles.formLogin}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.loginTitle}>Acceso al sistema</h1>

        <div className={styles.formFloating}>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            className={styles.formControl}
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" "
            required
          />
        </div>

        <div className={styles.formFloating}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className={styles.formControl}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className={styles.loginButton} type="submit">
          Iniciar sesión
        </button>
      </form>

      {error && <div className={styles.loginAlert}>{error}</div>}
    </main>
  );
}

export default Login;
