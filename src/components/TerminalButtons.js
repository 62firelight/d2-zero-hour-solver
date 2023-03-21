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
                onMouseOver={() => props.setHoverInput(number.number)}
                onMouseOut={() => props.setHoverInput(-1)}
            >
                {number.number}
            </button>
        );
    });
    return (
        <div className="terminal-buttons">
            {buttonList}
            <img className="wheel" src="./wheel.png" />
        </div>
    );
}

export default TerminalButtons;
