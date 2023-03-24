import React from "react";

const ELEMENT_COLORS = new Map([
    ["Void", "fuchsia"],
    ["Solar", "orange"],
    ["Arc", "lightblue"],
]);

function FilterButton(props) {
    // const buttonName = props.isPressed ? (
    //     <strong>{props.element}</strong>
    // ) : (
    //     <div>{props.element}</div>
    // );

    function getBorderColor() {
        let color = props.element;

        if (color === "Void") {
            return "purple";
        }
        
        if (color === "Solar") {
            return "rgb(121, 79, 0)";
        }

        if (color === "Arc") {
            return "rgb(36, 99, 119)";
        }

        return "black";
    }

    return (
        <button
            className="filter-button"
            style={{
                backgroundColor: ELEMENT_COLORS.get(props.element),
                border: props.isPressed
                    ? `8px solid ${getBorderColor()}`
                    : "8px solid transparent",
            }}
            title={props.element}
            onClick={() => props.toggleElement(props.element)}
        >
        </button>
    );
}

export default FilterButton;
