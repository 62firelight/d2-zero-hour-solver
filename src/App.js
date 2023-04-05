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
            <div className="room-map-container" id="map">
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
                <div className="nodes">
                    {nodeList}
                    <div className="small-room-entrance"></div>
                </div>
                <div className="solution">{mostRecentSolution}</div>
                <div className="big-room-entrance"></div>
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
            <h2>Guide</h2>
            <div className="how-to-guide">
                <p>
                    <strong>Note: </strong>the{" "}
                    <span style={{ color: "blue" }}>Blue</span>,{" "}
                    <span style={{ color: "green" }}>Green</span> and{" "}
                    <span style={{ color: "red" }}>Red</span> keycards are also
                    required to be collected to gain the reward associated with
                    the puzzle.
                </p>
                <h3>Overview</h3>
                <p>
                    The puzzle is located near the end of the{" "}
                    <strong>Zero Hour mission. </strong>
                    Specifically, it is inside the{" "}
                    <strong>large exhibit room</strong> just after the white
                    tile room that will incinerate any players inside it if the
                    wrong tile is stepped on, and just before dropping down the
                    hole into the passage that leads to the boss fight. See the{" "}
                    <a href="#map">top of this page</a> for a map of the exhibit room.
                </p>
                {/* image of exhibit room */}
                <p>
                    The exhibit room has 8 rooms running along the left and
                    right sides. 1 of those rooms on the far-right side of the
                    room (the "black" room on the map) has a hole that leads to
                    the boss fight and has no colour associated with it. The{" "}
                    <strong>7 other rooms</strong> have a colour associated with
                    them. Not including the room with the hole, they are (from
                    left to right, top to bottom){" "}
                    <span style={{ color: "green" }}>Green</span>,{" "}
                    <span style={{ color: "gray" }}>White</span>,{" "}
                    <span style={{ color: "purple" }}>Purple</span>,{" "}
                    <span style={{ color: "#8B8000" }}>Yellow</span>,{" "}
                    <span style={{ color: "blue" }}>Blue</span>,{" "}
                    <span style={{ color: "red" }}>Red</span> and{" "}
                    <span style={{ color: "cyan" }}>Cyan</span>.
                </p>
                {/* image of room interior? */}
                <p>
                    Inside each of these 7 coloured rooms are{" "}
                    <strong>7 servers</strong> located in specific positions.
                    They are marked 1 to 7 according to their position. On the
                    map above, the servers and their positions can be seen in
                    the middle.
                </p>
                <p>
                    The goal of the puzzle is to{" "}
                    <strong>activate all 49 servers</strong>. However, the order
                    in which they are activated depends on{" "}
                    <strong>3 terminals</strong> located around the room and the{" "}
                    <strong>configuration element</strong> (that changes each
                    week).
                </p>
                {/* image of terminal and their locations? */}
                <p>
                    On each terminal are <strong>2 circles</strong> with thick
                    edges. The edges are divided into{" "}
                    <strong>12 sections</strong>, like a clock. Going clockwise,
                    these sections are numbered 1 to 12.{" "}
                    <strong>1 of these sections</strong> will be{" "}
                    <strong>highlighted in yellow</strong> for each circle.
                </p>
                <p>
                    The number of the highlighted section needs to be read. The
                    sequence of numbers on the terminals will correspond to a
                    specific server around the room. For example, if 1 and 2 are
                    highlighted on terminal 1 during a void configuration, the
                    server <strong>Green 4</strong> must be activated. Once
                    Green 4 has been activated, the terminal(s) will change
                    numbers and will need to be read again to find the next
                    server to activate.{" "}
                    <strong>
                        In some cases, numbers from another terminal
                    </strong>{" "}
                    need to be read in order to narrow down the specific server
                    to activate. Only a maximum of 2 terminals are required to
                    complete the puzzle.
                </p>
                <p>
                    If the wrong server is activated, that server's screen will
                    appear red and needs to be deactivated by interacting with
                    it again.
                </p>
                <p>
                    Once ready, the puzzle can be started by interacting with
                    one of the three terminals. A "Begin Sequencing" prompt will
                    appear when looking at a terminal.
                </p>
                <p>
                    Once all 49 servers have been activated, a noise will play
                    and the quest associated with the puzzle should complete
                    (assuming all 3 keycards were collected).
                </p>
                <h3>Using the Solver</h3>
                <p>
                    For the sake of simplicity, this solver will only be
                    focusing on the{" "}
                    <strong>
                        2 terminals located on the left side of the exhibit room
                    </strong>
                    , though the 3rd terminal on the right side of the room may
                    be used as well.
                </p>
                <p>
                    Position yourself at terminal 1. Read the numbers from
                    terminal 1 and click the corresponding numbers on the solver
                    app's circle. In case you lose track of which terminal or
                    circle you are reading for, you can look at the text
                    highlighted in <strong>bold</strong> below the map. This is
                    important as you may need to read the numbers from terminal
                    2 as well.
                </p>
                <p>
                    Once a sequence of numbers has been entered, the location of
                    the server will be shown on the map (e.g. "Cyan 5"), along
                    with the location of the server within the room. Keep in
                    mind that the solver will reset itself to the left circle of
                    terminal 1 for each successful sequence of numbers that are
                    read.
                </p>
                <p>
                    The solver will automatically keep track of what servers
                    have and haven't been activated. If you enter the wrong
                    number and/or get the wrong server, you can click the{" "}
                    <strong>Clear Terminals</strong> or <strong>Undo</strong>{" "}
                    buttons to clear the terminals in the solver or de-activate
                    the last activated server.
                </p>
                <h3>Notes</h3>
                <ul>
                    <li>
                        When activating the correct server, 15 seconds will be
                        added to the mission timer.
                    </li>
                    <li>It is possible to complete the puzzle solo.</li>
                </ul>
            </div>
        </div>
    );
}

export default App;
