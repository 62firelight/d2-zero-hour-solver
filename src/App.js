import "./App.css";
import FilterButton from "./components/FilterButton";
import { useEffect, useMemo, useState } from "react";
import TerminalButtons from "./components/TerminalButtons";
import ArrayKeyedMap from "array-keyed-map";
import NODE_MAP from "./components/NODE_MAP";
import FILTER_MAP from "./components/FILTER_MAP";

const ELEMENTS = Object.keys(FILTER_MAP);

function App() {
    const [element, setElement] = useState("Void");
    const [solutionMap, setSolutionMap] = useState(NODE_MAP.get(element));
    const [solutions, setSolutions] = useState([]);
    const [input, setInput] = useState([]);
    const [hoverInput, setHoverInput] = useState(-1);

    const solved = NODE_MAP.get(element).size - solutionMap.size;
    const numberOfSolutions = NODE_MAP.get(element).size;

    const disabled = useMemo(() => {
        const nodeKeys = [...solutionMap.keys()];
        let newDisabled = [];
        for (let i = 1; i < 13; i++) {
            // Make a copy of input
            const newInput = input.slice(0);

            // Add on a new number to check potential outcomes
            newInput.push(i);

            // Check which inputs should not be disabled
            const shouldNotBeDisabled = nodeKeys.some((key) => {
                // Make a copy of the first X elements of the key
                // where X is the length of newInput
                const keyCopy = key.slice(0, newInput.length);

                // Check if the key starts with exactly the same elements
                // as newInput
                const startsWith = keyCopy.every((element, index) => {
                    return element === parseInt(newInput[index]);
                });

                // Check that newInput is not longer than the key
                const notLongerThanKey = newInput.length <= key.length;
                return startsWith && notLongerThanKey;
            });

            // console.log(newInput, shouldNotBeDisabled);

            if (!shouldNotBeDisabled) {
                newDisabled.push(i);
            }
        }
        return newDisabled;
    }, [input, solutionMap]);

    // Show solution
    if (disabled.length === 12 && solved < numberOfSolutions) {
        const newSolution = solutionMap.get(input);
        setSolutions([...solutions, newSolution]);

        const solutionMapCopy = new ArrayKeyedMap(solutionMap);
        solutionMapCopy.delete(input);
        setSolutionMap(solutionMapCopy);

        setInput([]);
    }

    function toggleElement(element) {
        setElement(element);
        const newSolutionMap = NODE_MAP.get(element);
        setSolutionMap(newSolutionMap);

        setSolutions([]);

        setInput([]);
    }

    function setTerminalInput(terminalInput) {
        setInput([...input, terminalInput]);
    }

    const filterList = ELEMENTS.map((element) => {
        return (
            <FilterButton
                key={element}
                element={element}
                toggleElement={toggleElement}
            />
        );
    });

    function getHoverString(index, end) {
        let assignedHoverInput =
            input.length === index &&
            hoverInput !== -1 &&
            !disabled.includes(hoverInput)
                ? hoverInput.toString()
                : "?";

        let hoverString = input[index]
            ? input[index].toString()
            : assignedHoverInput;

        hoverString = (
            <div className="terminal-individual-input">
                {hoverString.length > 0 && end ? "-" : ""}
                <div
                    className={
                        input.length === index ? "highlight" : "no-highlight"
                    }
                >
                    {hoverString}
                </div>
            </div>
        );

        return hoverString;
    }

    const terminal1 = (
        <div className="terminal-input">
            <strong>Terminal 1:</strong> {getHoverString(0, false)}
            {getHoverString(1, true)}
        </div>
    );
    const terminal2 =
        input.length >= 2 ? (
            <div className="terminal-input">
                <strong>Terminal 2:</strong> {getHoverString(2, false)}
                {getHoverString(3, true)}
            </div>
        ) : (
            <br />
        );

    const progress =
        solved >= numberOfSolutions ? (
            <strong>
                Finished: {solved} / {numberOfSolutions}
            </strong>
        ) : (
            <strong>
                Progress: {solved} / {numberOfSolutions}
            </strong>
        );

    let terminalNumber = 1;
    if (input.length >= 2) {
        terminalNumber = 2;
    }
    if (input.length >= 4) {
        terminalNumber = 3;
    }
    const inputSide = (input.length + 1) % 2 === 0 ? "Right" : "Left";

    const solutionList = solutions
        .map((solution) => <li>{solution}</li>)
        .reverse();

    return (
        <div className="app">
            <div className="filter-buttons">{filterList}</div>
            <h2>{element}</h2>
            <div className="room-map-container">
                <img className="room-map" src="./map.png" alt="room map" />
                <div className="solution">
                    {solutions[solutions.length - 1]}
                </div>
            </div>
            <div className="terminal-info">
                {progress}
                <button type="button" onClick={() => toggleElement(element)}>
                    Reset
                </button>
                <div className="terminal-inputs">
                    {terminal1}
                    {terminal2}
                </div>
            </div>
            <h3 className="terminal-heading">
                Input Terminal {terminalNumber} ({inputSide})
            </h3>
            <TerminalButtons
                disabled={disabled}
                setTerminalInput={setTerminalInput}
                setHoverInput={setHoverInput}
            />
            <h3 className="history-heading">History</h3>
            <ul>{solutionList.length > 0 ? solutionList : "<empty>"}</ul>
            <img
                className="route-map"
                src={FILTER_MAP[element]}
                alt="route map"
            />
            <a href="https://www.shacknews.com/article/111630/zero-hour-mission-guide-destiny-2">
                Source
            </a>
        </div>
    );
}

export default App;
