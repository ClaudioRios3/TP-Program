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
    <main className={styles.formSignin}>
      <br />
      <form onSubmit={handleSubmit}>
        <h3 className={styles.loginTitle}>Acceso al sistema</h3>

        <div className={styles.formFloating}>
          <input
            type="text"
            className={styles.formControl}
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=""
            required
          />
          <label htmlFor="username">Nombre de usuario</label>
        </div>

        <div className={styles.formFloating}>
          <input
            type="password"
            className={styles.formControl}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
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
