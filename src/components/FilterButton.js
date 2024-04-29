import React from "react";

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
                backgroundColor: props.getElementColor(props.element),
                border: props.isPressed
                    ? `8px solid ${props.getBorderColor()}`
                    : "8px solid transparent",
            }}
            title={props.element}
            onClick={() => props.toggleElement(props.element)}
        >
        </button>
    );
}

export default FilterButton;
