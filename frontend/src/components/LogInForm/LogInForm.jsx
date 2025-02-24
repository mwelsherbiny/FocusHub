import "./LogInForm.css";
import auth from "../../services/auth";
import { useState } from "react";

export default function LogInForm({
  setSignedIn,
  setNotification,
  setVisibleNotification,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function logIn(event) {
    event.preventDefault();

    const data = await auth.logIn(username, password);

    if (data.error) {
      setNotification({ content: data.error, type: "error" });
      setVisibleNotification(true);
      setTimeout(() => {
        setVisibleNotification(false);
      }, 3000);
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("signedIn", true);
      setSignedIn(true);

      setNotification({ content: "Login successful!", type: "success" });
      setVisibleNotification(true);
      setTimeout(() => {
        setVisibleNotification(false);
      }, 3000);
    }
  }

  return (
    <form className="auth-form" onSubmit={logIn}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          id="password"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button type="submit" className="auth-btn">
        Log In
      </button>
    </form>
  );
}
