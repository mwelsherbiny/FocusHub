import { useContext } from "react";
import "./WidgetSettings.css";
import { WidgetContext } from "../../contexts";

export default function WidgetSettings() {
  const { widgets, widgetFilter, setWidgetFilter } = useContext(WidgetContext);

  return (
    <div className="widget-settings">
      {widgets.map((widget) => (
        <button
          style={{
            backgroundColor: widgetFilter[widget.name] ? "#0C7FDA" : null,
          }}
          key={widget.name}
          onClick={() => {
            const newFilter = {
              ...widgetFilter,
              [widget.name]: !widgetFilter[widget.name],
            };
            setWidgetFilter(newFilter);

            localStorage.setItem("widgetFilter", JSON.stringify(newFilter));
          }}
        >
          <img src={widget.icon} alt="Widget" />
        </button>
      ))}
    </div>
  );
}
