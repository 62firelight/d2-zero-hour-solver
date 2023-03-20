import logo from "./logo.svg";
import "./App.css";
import FilterButton from "./components/FilterButton";
import { useEffect, useState } from "react";
import TerminalButtons from "./components/TerminalButtons";
import ArrayKeyedMap from "array-keyed-map";

const VOID_MAP = new ArrayKeyedMap([
    [[1, 1, 2], "White 1"],
    [[1, 1, 4], "Red 2"],
    [[1, 2], "Red 1"],
]);
const SOLAR_MAP = new ArrayKeyedMap([
    [[1, 2], "Green 4"],
    [[1, 3], "Cyan 4"],
    [[1, 7, 2], "White 6"],
]);
const ARC_MAP = new ArrayKeyedMap([
    [[1, 4], "Red 6"],
    [[1, 6], "Yellow 7"],
    [[2, 4], "Green 3"],
]);
const NODE_MAP = new Map([
    ["Void", VOID_MAP],
    ["Solar", SOLAR_MAP],
    ["Arc", ARC_MAP],
]);

const FILTER_MAP = {
    Void: "./void.jpg",
    Solar: "./solar.jpg",
    Arc: "./arc.jpg",
};
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

    return (
        <div className="app">
            <div className="filter-buttons">{filterList}</div>
            <h2>{element}</h2>
            <strong>
                Progress: {solved} / {numberOfSolutions}
            </strong>
            <button type="button" onClick={() => toggleElement(element)}>
                Reset
            </button>
            <h3>Terminal {terminalNumber}</h3>
            <TerminalButtons
                disabled={disabled}
                setTerminalInput={setTerminalInput}
            />
            {solution}
            <img src={FILTER_MAP[element]} />
            <a href="https://www.shacknews.com/article/111630/zero-hour-mission-guide-destiny-2">
                Source
            </a>
        </div>
    );
}

export default App;
