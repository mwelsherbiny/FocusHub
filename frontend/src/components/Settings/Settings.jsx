import "./Settings.css";
import settingsIcon from "../../assets/settings-icon.svg";
import { useState, useEffect, useContext } from "react";
import userService from "../../services/userService";
import { UserContext } from "../../contexts";
import Modal from "@mui/material/Modal";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import { Link } from "react-router";

export default function Settings({ generalSettings, pomodoroSettings }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!open) {
      userService.updateUser({
        settings: {
          ...user.settings,
          sessionTime: pomodoroSettings.sessionTime,
          breakTime: pomodoroSettings.breakTime,
        },
      });
    }
  }, [open]);

  return (
    <div className="settings">
      <Link to={"/history"}>
        <button className="settings-btn">History</button>
      </Link>

      <button className="settings-btn" onClick={handleOpen}>
        Settings <img src={settingsIcon} alt="settings-icon"></img>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="settings modal"
        aria-describedby="settings for timer and widgets"
      >
        <SettingsPanel
          generalSettings={generalSettings}
          pomodoroSettings={pomodoroSettings}
        />
      </Modal>
    </div>
  );
}
