import React from "react";

const ELEMENT_COLORS = new Map([
    ["Void", "purple"],
    ["Solar", "orange"],
    ["Arc", "lightblue"],
]);

function FilterButton(props) {
    // const buttonName = props.isPressed ? (
    //     <strong>{props.element}</strong>
    // ) : (
    //     <div>{props.element}</div>
    // );

    return (
        <button
            className="filter-button"
            style={{
                backgroundColor: ELEMENT_COLORS.get(props.element),
                border: props.isPressed
                    ? "8px dotted"
                    : "8px solid transparent",
            }}
            title={props.element}
            onClick={() => props.toggleElement(props.element)}
        >
        </button>
    );
}

export default FilterButton;
