import React from "react";

let numberList = [];
for (let i = 1; i < 13; i++) {
    numberList.push(i);
}

function TerminalButtons(props) {
    const buttonList = numberList.map((number) => {
        return (
            <button
                key={number}
                disabled={props.disabled.some(
                    (disabledNumber) => disabledNumber === number
                )}
                onClick={() => props.setTerminalInput(number)}
            >
                {number}
            </button>
        );
    });
    return <div className="terminal-buttons">{buttonList}</div>;
}

export default TerminalButtons;
