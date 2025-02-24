import "./Auth.css";
import Modal from "@mui/material/Modal";
import { useState, useContext } from "react";
import LogInForm from "../LogInForm/LogInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { NotificationContext } from "../../contexts";

export default function Auth({ setSignedIn }) {
  const [loggingIn, setLoggingIn] = useState(true);
  const { setNotification, setVisibleNotification } =
    useContext(NotificationContext);

  return (
    <Modal
      open={true}
      onClose={null}
      aria-labelledby="auth modal"
      aria-describedby="authentication"
    >
      <div className="settings-panel">
        <h2>Authentication</h2>
        <div className="settings-selector">
          <button
            style={{ backgroundColor: loggingIn ? "#2196F3" : "" }}
            onClick={() => setLoggingIn(true)}
          >
            Login
          </button>
          <button
            style={{ backgroundColor: loggingIn ? "" : "#2196F3" }}
            onClick={() => setLoggingIn(false)}
          >
            Signup
          </button>
        </div>
        {loggingIn && (
          <LogInForm
            setSignedIn={setSignedIn}
            setVisibleNotification={setVisibleNotification}
            setNotification={setNotification}
          />
        )}
        {!loggingIn && (
          <SignUpForm
            setSignedIn={setSignedIn}
            setVisibleNotification={setVisibleNotification}
            setNotification={setNotification}
          />
        )}
      </div>
    </Modal>
  );
}
