import logo from "./logo.svg";
import "./App.css";
import FilterButton from "./components/FilterButton";
import { useEffect, useState } from "react";
import TerminalButtons from "./components/TerminalButtons";
import ArrayKeyedMap from "array-keyed-map";
import NODE_MAP from "./components/NODE_MAP";
import FILTER_MAP from "./components/FILTER_MAP";

const ELEMENTS = Object.keys(FILTER_MAP);

function App() {
    const [element, setElement] = useState("Void");
    const [solutionMap, setSolutionMap] = useState(NODE_MAP.get(element));

    const [solution, setSolution] = useState("");
    const [solved, setSolved] = useState(0);
    const [numberOfSolutions, setNumberOfSolutions] = useState(
        solutionMap.size
    );

    const [input, setInput] = useState([]);
    const [hoverInput, setHoverInput] = useState(-1);
    const [disabled, setDisabled] = useState([]);

    function toggleElement(element) {
        setElement(element);
        const newSolutionMap = NODE_MAP.get(element);
        setSolutionMap(newSolutionMap);

        setSolution("");
        setSolved(0);
        setNumberOfSolutions(newSolutionMap.size);

        setInput([]);
    }

    function setTerminalInput(terminalInput) {
        setInput([...input, terminalInput]);
        setSolution("");
    }

    function getHoverString(index, end) {
        let assignedHoverInput =
            hoverInput !== -1 && !disabled.includes(hoverInput)
                ? "" + hoverInput
                : "?";

        if (input.length !== index) {
            assignedHoverInput = " ";
        }

        let hoverString = input[index] ? "" + input[index] : assignedHoverInput;
        if (hoverString.length > 0 && hoverString !== " " && end) {
            hoverString = "-" + hoverString;
        }

        return hoverString;
    }

    useEffect(() => {
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
        setDisabled(newDisabled);
    }, [input]);

    useEffect(() => {
        if (disabled.length === 12 && solved < numberOfSolutions) {
            const solution = solutionMap.get(input);
            setSolution(solution);

            const solutionMapCopy = new ArrayKeyedMap(solutionMap);
            solutionMapCopy.delete(input);
            setSolutionMap(solutionMapCopy);

            setSolved(solved + 1);
            setInput([]);
        }
    }, [disabled]);

    const filterList = ELEMENTS.map((element) => {
        return (
            <FilterButton
                key={element}
                element={element}
                toggleElement={toggleElement}
            />
        );
    });

    const terminalNumber = input.length < 2 ? 1 : 2;
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

    return (
        <div className="app">
            <div className="filter-buttons">{filterList}</div>
            <h2>{element}</h2>
            <div className="room-map-container">
                <img className="room-map" src="./map.png" alt="room map" />
                <div className="solution">{solution}</div>
            </div>
            {progress}
            <button type="button" onClick={() => toggleElement(element)}>
                Reset
            </button>
            {terminal1}
            {terminal2}
            <h3 className="terminal-heading">
                Input Terminal {terminalNumber}
            </h3>
            <TerminalButtons
                disabled={disabled}
                setTerminalInput={setTerminalInput}
                setHoverInput={setHoverInput}
            />
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
