import React from "react";

function FilterButton(props) {
    const buttonName = props.isPressed ? <strong>{props.element}</strong> : <div>{props.element}</div>;

    return (
        <button onClick={() => props.toggleElement(props.element)}>
            {buttonName}
        </button>
    );
}

export default FilterButton;
