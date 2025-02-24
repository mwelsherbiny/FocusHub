import "./SignUpForm.css";
import auth from "../../services/auth";
import { useState } from "react";

export default function SignUpForm({
  setSignedIn,
  setNotification,
  setVisibleNotification,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function signUp(event) {
    event.preventDefault();

    const data = await auth.signUp(username, password);

    if (data.error) {
      setErrorMessage(data.error);
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("signedIn", true);
      setSignedIn(true);

      setNotification({ content: "Signup successful!", type: "success" });
      setVisibleNotification(true);
      setTimeout(() => {
        setVisibleNotification(false);
      }, 3000);
    }
  }

  return (
    <form className="auth-form" onSubmit={signUp}>
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
        Sign Up
      </button>
      <p className="error-message">{errorMessage}</p>
    </form>
  );
}
