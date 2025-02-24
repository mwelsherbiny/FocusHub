import "./Widgets.css";
import { useContext, useState } from "react";
import { WidgetContext } from "../../contexts";
import WidgetMenu from "../WidgetMenu/WidgetMenu";

export default function Widgets({ smallScreen }) {
  const { widgets, widgetFilter } = useContext(WidgetContext);

  if (smallScreen) {
    return <WidgetMenu widgets={widgets} widgetFilter={widgetFilter} />;
  }

  return (
    <div className="widgets">
      {widgets.map((widget) => {
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
