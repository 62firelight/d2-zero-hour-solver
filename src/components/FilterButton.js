import React from "react";

function FilterButton(props) {
    return (
        <button onClick={() => props.toggleElement(props.element)}>
            {props.element}
        </button>
    );
}

export default FilterButton;
