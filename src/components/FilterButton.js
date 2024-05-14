import React from "react";

const BUTTON_NAMES = new Map([
    ["Void", "1"],
    ["Solar", "2"],
    ["Arc", "3"],
]);

function FilterButton(props) {
    // const buttonName = props.isPressed ? (
    //     <strong>{props.element}</strong>
    // ) : (
    //     <div>{props.element}</div>
    // );

    function getButtonName(element) {
        return BUTTON_NAMES.get(element);
    }
    
    return (
        <button
            className="filter-button"
            style={{
                backgroundColor: props.getElementColor(props.element),
                border: props.isPressed
                    ? `8px solid ${props.getBorderColor()}`
                    : "8px solid transparent",
            }}
            title={props.element}
            onClick={() => props.toggleElement(props.element)}
            disabled={props.element !== "Void"}
        >
        <strong>{getButtonName(props.element)}</strong>
        </button>
    );
}

export default FilterButton;
