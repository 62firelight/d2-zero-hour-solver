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
const NODE_MAP = new Map([
    ["Void", VOID_MAP],
    ["Solar", new Map()],
    ["Arc", new Map()]
]);

const FILTER_MAP = {
    Void: "./void.jpg",
    Solar: "./solar.jpg",
    Arc: "./arc.jpg",
};
const ELEMENTS = Object.keys(FILTER_MAP);

function App() {
    const [element, setElement] = useState("Void");
    const [input, setInput] = useState([]);
    const [solutionMap, setSolutionMap] = useState(NODE_MAP.get(element));
    const [solution, setSolution] = useState("");
    const [numberOfSolutions, setNumberOfSolutions] = useState(solutionMap.size);
    const [solved, setSolved] = useState(0);
    const [disabled, setDisabled] = useState([]);

    function toggleRoute(element) {
        setElement(element);
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

        if (newDisabled.length === 12 && solved < numberOfSolutions) {
            const solution = solutionMap.get(input)
            setSolution(solution);
            
            const solutionMapCopy = new ArrayKeyedMap(solutionMap);
            solutionMapCopy.delete(input);
            setSolutionMap(solutionMapCopy);

            setSolved(solved + 1);
            setInput([]);
        }
    }, [input]);

    const filterList = ELEMENTS.map((element) => {
        return (
            <FilterButton
                key={element}
                element={element}
                toggleRoute={toggleRoute}
            />
        );
    });

    return (
        <div className="app">
            <div className="filter-buttons">{filterList}</div>
            <h2>{element}</h2>
            <strong>Progress: {solved} / {numberOfSolutions}</strong>
            <h3>Terminal 1</h3>
            <TerminalButtons
                disabled={disabled}
                setTerminalInput={setTerminalInput}
            />
            {solution}
            <img src={FILTER_MAP[element]} />
        </div>
    );
}

export default App;
