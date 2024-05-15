import React from "react";

const BUTTON_NAMES = new Map([
    ["Week 1", "1"],
    ["Week 2", "2"],
    ["Week 3", "3"],
]);

function FilterButton(props) {
    function getButtonName(week) {
        return BUTTON_NAMES.get(week);
    }
    
    return (
        <button
            className="filter-button"
            style={{
                backgroundColor: props.getWeekColor(props.week),
                border: props.isPressed
                    ? `8px solid ${props.getBorderColor()}`
                    : "8px solid transparent",
            }}
            title={props.week}
            onClick={() => props.toggleElement(props.week)}
            disabled={props.week !== "Week 1"}
        >
        <strong>{getButtonName(props.week)}</strong>
        </button>
    );
}

export default FilterButton;
