import { useState } from "react";
import { loginUser } from "../services/authService";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("admin@book.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const user = await loginUser(email, password);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
  <div className="login-page">
    <div className="login-card">
      <h1>BookStore</h1>
      <p>Demo Recovery System</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Giriş Yap</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  </div>

  );
}

export default LoginForm;