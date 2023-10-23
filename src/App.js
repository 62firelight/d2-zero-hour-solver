import "./App.css";
import FilterButton from "./components/FilterButton";
import { useMemo, useState } from "react";
import TerminalButtons from "./components/TerminalButtons";
import Guide from "./components/Guide";
import ArrayKeyedMap from "array-keyed-map";
import NODE_MAP from "./components/NODE_MAP";
import FILTER_MAP from "./components/FILTER_MAP";
import ReactConfetti from "react-confetti";
import Map from "./components/Map";

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
        .map((solution, index) => (
            <li key={solution[1]}>
                <strong>{index + 1}.</strong> {solution[1]}
            </li>
        ))
        .reverse();

    return (
        <div className="app">
            <h1>Destiny 2 Zero Hour Solver</h1>
            <h2>{element} Configuration</h2>
            <div className="filter-buttons">{filterList}</div>
            <Map solutions={solutions} />
            {solved >= numberOfSolutions ? (
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            ) : (
                ""
            )}
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
                Clear Terminals
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
            <ul className="history">
                {solutionList.length > 0 ? solutionList : "<empty>"}
            </ul>
            <p>
                Credit to /u/pastuleo23 for creating the wheel image (
                <a
                    href="https://www.reddit.com/r/raidsecrets/comments/bmi7fv/void_configuration_solution_solver_mobile_support/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Link
                </a>
                )
            </p>
            <hr />
            <h2>Vault Route</h2>
            <img
                className="route-map"
                src={FILTER_MAP[element]}
                alt="route map"
            />
            <p>
                Credit to /u/KPA for the routes (
                <a
                    href="https://www.reddit.com/r/DestinyTheGame/comments/brdehh/fire_room_solutions_solar_arc_void_configurations/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Link
                </a>
                )
            </p>
            <hr />
            Created by 62firelight
            <a
                href="https://github.com/62firelight/d2-zero-hour-solver"
                target="_blank"
                rel="noreferrer"
            >
                GitHub
            </a>
            {/* <br /> */}
            <hr />
            <Guide />
        </div>
    );
}

export default App;
