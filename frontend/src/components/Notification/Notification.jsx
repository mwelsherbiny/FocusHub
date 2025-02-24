import "./Notification.css";

export default function Notification({ notification, visible }) {
  function getFontColor() {
    if (
      notification.type === "error" ||
      notification.type === "warning" ||
      notification.type === "success"
    ) {
      return `${notification.type}-color`;
    }
    return `notification-color`;
  }

  return (
    <div
      className={`notification ${visible ? "visible" : ""}`}
      style={{
        visibility: visible ? "visible" : "hidden",
        backgroundColor: `var(--light-${getFontColor()})`,
        color: `var(--${getFontColor()})`,
        border: `2px solid var(--${getFontColor()})`,
      }}
    >
      {notification.content}
    </div>
  );
}
