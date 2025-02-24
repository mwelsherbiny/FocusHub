import "./WidgetMenu.css";
import { useState } from "react";
import widgetMenuIcon from "../../assets/widget-menu-icon.svg";

export default function WidgetMenu({ widgets, widgetFilter }) {
  const [widgetsVisible, setWidgetsVisible] = useState(false);

  return (
    <div className="widgets">
      <div
        onClick={() => setWidgetsVisible(!widgetsVisible)}
        className="widget"
      >
        <img src={widgetMenuIcon} alt="Widget menu icon" />
      </div>
      {widgetsVisible &&
        widgets.map((widget) => {
          if (widgetFilter[widget.name]) {
            const Widget = widget.widget;
            return (
              <Widget
                key={widget.name}
                icon={widget.icon}
                visible={widget.visible}
                setVisibility={widget.setVisibility}
                widgetProps={widget.widgetProps}
              />
            );
          }
        })}
    </div>
  );
}
