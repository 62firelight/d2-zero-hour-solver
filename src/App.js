import "./App.css";
import FilterButton from "./components/FilterButton";
import { useMemo, useState } from "react";
import TerminalButtons from "./components/TerminalButtons";
import ArrayKeyedMap from "array-keyed-map";
import NODE_MAP from "./components/NODE_MAP";
import FILTER_MAP from "./components/FILTER_MAP";
import ReactConfetti from "react-confetti";

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
        const newSolution = [input, solutionMap.get(input)];
        setSolutions([...solutions, newSolution]);

        const solutionMapCopy = new ArrayKeyedMap(solutionMap);
        solutionMapCopy.delete(input);
        setSolutionMap(solutionMapCopy);

        setInput([]);
        setHoverInput(-1);
    }

    function toggleElement(element) {
        if (solved > 0) {
            const userConfirm = window.confirm(
                "Are you sure that you want to reset your progress?"
            );

            if (!userConfirm) {
                return;
            }
        }

        setElement(element);
        const newSolutionMap = NODE_MAP.get(element);
        setSolutionMap(newSolutionMap);

        setSolutions([]);

        setInput([]);
        setHoverInput(-1);
    }

    function setTerminalInput(terminalInput) {
        setInput([...input, terminalInput]);
    }

    const filterList = ELEMENTS.map((name) => {
        return (
            <FilterButton
                key={name}
                element={name}
                isPressed={name === element}
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
                <div
                    className={
                        input.length === index ? "highlight" : "no-highlight"
                    }
                >
                    {hoverString.length > 0 && end ? "Right: " : "Left: "}{" "}
                    {hoverString}
                </div>
            </div>
        );

        return hoverString;
    }

    function undo() {
        const mostRecentSolution = solutions.pop();

        if (mostRecentSolution) {
            const solutionMapCopy = new ArrayKeyedMap(solutionMap);
            solutionMapCopy.set(mostRecentSolution[0], mostRecentSolution[1]);
            setSolutionMap(solutionMapCopy);

            setInput([]);
            setHoverInput(-1);
        }
    }

    function getSplitSolution() {
        if (solutions.length <= 0) {
            return undefined;
        }

        const mostRecentSolution = solutions[solutions.length - 1];

        return mostRecentSolution[1].split(" ");
    }

    const nodeList = [1, 2, 3, 4, 5, 6, 7].map((number) => {
        const name = `node-${number}`;
        const splitSolution = getSplitSolution();

        let backgroundColor = "grey";
        if (splitSolution && number === parseInt(splitSolution[1])) {
            backgroundColor = splitSolution[0].toLowerCase();
        }

        return (
            <div
                key={name}
                className={name}
                style={{ backgroundColor: backgroundColor }}
            >
                <span>{number}</span>
            </div>
        );
    });

    const terminal1 = (
        <div className="terminal-input">
            <strong>Terminal 1</strong> - {getHoverString(0, false)}{" "}
            {getHoverString(1, true)}
        </div>
    );
    const terminal2 = (
        <div className="terminal-input">
            <strong>Terminal 2</strong> - {getHoverString(2, false)}{" "}
            {getHoverString(3, true)}
        </div>
    );

    const progress = (
        <div>
            <strong>Progress:</strong> {solved} / {numberOfSolutions}
        </div>
    );

    // let terminalNumber = 1;
    // if (input.length >= 2) {
    //     terminalNumber = 2;
    // }
    // if (input.length >= 4) {
    //     terminalNumber = 3;
    // }
    // const inputSide = (input.length + 1) % 2 === 0 ? "Right" : "Left";

    const solutionList = solutions
        .map((solution) => <li key={solution[1]}>{solution[1]}</li>)
        .reverse();
    const mostRecentSolution =
        solutions.length > 0 ? solutions[solutions.length - 1][1] : "";

    return (
        <div className="app">
            <h1>Destiny 2 Zero Hour Solver</h1>

            <h2>{element} Configuration</h2>
            <div className="filter-buttons">{filterList}</div>

            <div className="room-map-container">
                {/* <img className="room-map" src="./map.png" alt="room map" /> */}
                <table>
                    <tbody>
                        <tr>
                            <td style={{ backgroundColor: "green" }}></td>
                            <td></td>
                            <td></td>
                            <td style={{ backgroundColor: "black" }}></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td style={{ backgroundColor: "white" }}></td>
                            <td></td>
                            <td></td>
                            <td style={{ backgroundColor: "purple" }}></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td style={{ backgroundColor: "yellow" }}></td>
                            <td></td>
                            <td></td>
                            <td style={{ backgroundColor: "blue" }}></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td style={{ backgroundColor: "red" }}></td>
                            <td></td>
                            <td></td>
                            <td style={{ backgroundColor: "cyan" }}></td>
                        </tr>
                    </tbody>
                </table>
                <div className="nodes">{nodeList}</div>
                <div className="solution">{mostRecentSolution}</div>
            </div>

            {solved >= numberOfSolutions ? <ReactConfetti /> : ""}

            <div className="terminal-info">
                <div className="terminal-inputs">
                    {terminal1}
                    {terminal2}
                </div>
            </div>
            {/* <h2>
                Input Terminal {terminalNumber} ({inputSide})
            </h2> */}

            <button
                className="clear-inputs"
                disabled={input.length <= 0}
                onClick={() => setInput([])}
            >
                Clear Inputs
            </button>

            <TerminalButtons
                disabled={disabled}
                setTerminalInput={setTerminalInput}
                setHoverInput={setHoverInput}
                progress={progress}
                element={element}
                toggleElement={toggleElement}
                undo={undo}
            />

            <h2>History</h2>
            <ul>{solutionList.length > 0 ? solutionList : "<empty>"}</ul>

            <hr />

            <h2>Vault Route</h2>
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
