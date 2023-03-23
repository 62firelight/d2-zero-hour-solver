import React from "react";

let numberList = [];
for (let i = 1; i < 13; i++) {
    const newNumber = { className: `button-${i}`, number: i };
    numberList.push(newNumber);
}

function TerminalButtons(props) {
    const buttonList = numberList.map((number) => {
        return (
            <button
                className={number.className}
                key={number.number}
                disabled={props.disabled.some(
                    (disabledNumber) => disabledNumber === number.number
                )}
                onClick={() => props.setTerminalInput(number.number)}
                onMouseOver={() => {
                    if (window.innerWidth >= 800)
                        props.setHoverInput(number.number);
                }}
                onMouseOut={() => {
                    if (window.innerWidth >= 800) props.setHoverInput(-1);
                }}
            >
                {number.number}
            </button>
        );
    });
    return (
        <div className="terminal-buttons">
            {buttonList}
            <img className="wheel" src="./wheel.png" alt="button wheel" />
            <div className="progress">
                {props.progress}
                <button
                    type="button"
                    onClick={() => props.toggleElement(props.element)}
                >
                    Reset
                </button>
                <button onClick={() => props.undo()}>Undo</button>
            </div>
        </div>
    );
}

export default TerminalButtons;
