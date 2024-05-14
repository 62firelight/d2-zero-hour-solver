import "./App.css";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
// import TerminalButtons from "./components/TerminalButtons";
// import Guide from "./components/Guide";
// import ArrayKeyedMap from "array-keyed-map";
// import NODE_MAP from "./components/NODE_MAP";
import FILTER_MAP from "./components/FILTER_MAP";
// import ReactConfetti from "react-confetti";
// import RoomMap from "./components/RoomMap";

const ELEMENTS = Object.keys(FILTER_MAP);
const ELEMENT_NAMES = new Map([
    ["Void", "Week 1"],
    ["Solar", "Week 2"],
    ["Arc", "Week 3"],
]);
const ELEMENT_COLORS = new Map([
    ["Void", "fuchsia"],
    ["Solar", "orange"],
    ["Arc", "lightblue"],
]);
const BORDER_COLORS = new Map([
    ["Void", "purple"],
    ["Solar", "rgb(121, 79, 0)"],
    ["Arc", "rgb(36, 99, 119)"],
]);

function App() {
    const [element] = useState("Void");
    // const [solutionMap, setSolutionMap] = useState(NODE_MAP.get(element));
    // const [solutions, setSolutions] = useState([]);
    // const [input, setInput] = useState([]);
    // const [hoverInput, setHoverInput] = useState(-1);

    // const solved = NODE_MAP.get(element).size - solutionMap.size;
    // const numberOfSolutions = NODE_MAP.get(element).size;

    // const disabled = useMemo(() => {
    //     const nodeKeys = [...solutionMap.keys()];
    //     let newDisabled = [];
    //     for (let i = 1; i < 13; i++) {
    //         // Make a copy of input
    //         const newInput = input.slice(0);

    //         // Add on a new number to check potential outcomes
    //         newInput.push(i);

    //         // Check which inputs should not be disabled
    //         const shouldNotBeDisabled = nodeKeys.some((key) => {
    //             // Make a copy of the first X elements of the key
    //             // where X is the length of newInput
    //             const keyCopy = key.slice(0, newInput.length);

    //             // Check if the key starts with exactly the same elements
    //             // as newInput
    //             const startsWith = keyCopy.every((element, index) => {
    //                 return element === parseInt(newInput[index]);
    //             });

    //             // Check that newInput is not longer than the key
    //             const notLongerThanKey = newInput.length <= key.length;
    //             return startsWith && notLongerThanKey;
    //         });

    //         // console.log(newInput, shouldNotBeDisabled);

    //         if (!shouldNotBeDisabled) {
    //             newDisabled.push(i);
    //         }
    //     }
    //     return newDisabled;
    // }, [input, solutionMap]);

    // Show solution
    // if (disabled.length === 12 && solved < numberOfSolutions) {
    //     const newSolution = [input, solutionMap.get(input)];
    //     setSolutions([...solutions, newSolution]);

    //     const solutionMapCopy = new ArrayKeyedMap(solutionMap);
    //     solutionMapCopy.delete(input);
    //     setSolutionMap(solutionMapCopy);

    //     setInput([]);
    //     setHoverInput(-1);
    // }

    // function toggleElement(element) {
    //     if (solved > 0) {
    //         const userConfirm = window.confirm(
    //             "Are you sure that you want to reset your progress?"
    //         );

    //         if (!userConfirm) {
    //             return;
    //         }
    //     }

    //     setElement(element);
    //     const newSolutionMap = NODE_MAP.get(element);
    //     setSolutionMap(newSolutionMap);

    //     setSolutions([]);

    //     setInput([]);
    //     setHoverInput(-1);
    // }

    // function setTerminalInput(terminalInput) {
    //     setInput([...input, terminalInput]);
    // }

    function getElementName(element) {
        return ELEMENT_NAMES.get(element);
    }

    function getElementColor(element) {
        return ELEMENT_COLORS.get(element);
    }

    function getBorderColor() {
        let color = BORDER_COLORS.get(element);

        if (color === undefined) {
            return "black";
        }

        return color;
    }

    const filterList = ELEMENTS.map((name) => {
        return (
            <FilterButton
                key={name}
                element={name}
                isPressed={name === element}
                // toggleElement={toggleElement}
                getElementColor={getElementColor}
                getBorderColor={getBorderColor}
            />
        );
    });

    // function getHoverString(index, end) {
    //     let assignedHoverInput =
    //         input.length === index &&
    //         hoverInput !== -1 &&
    //         !disabled.includes(hoverInput)
    //             ? hoverInput.toString()
    //             : "?";

    //     let hoverString = input[index]
    //         ? input[index].toString()
    //         : assignedHoverInput;

    //     hoverString = (
    //         <div className="terminal-individual-input">
    //             <div
    //                 className={
    //                     input.length === index ? "highlight" : "no-highlight"
    //                 }
    //             >
    //                 {hoverString.length > 0 && end ? "Right: " : "Left: "}{" "}
    //                 {hoverString}
    //             </div>
    //         </div>
    //     );

    //     return hoverString;
    // }

    // function undo() {
    //     const mostRecentSolution = solutions.pop();

    //     if (mostRecentSolution) {
    //         const solutionMapCopy = new ArrayKeyedMap(solutionMap);
    //         solutionMapCopy.set(mostRecentSolution[0], mostRecentSolution[1]);
    //         setSolutionMap(solutionMapCopy);

    //         setInput([]);
    //         setHoverInput(-1);
    //     }
    // }

    // const terminal1 = (
    //     <div className="terminal-input">
    //         <strong>Terminal 1</strong> - {getHoverString(0, false)}{" "}
    //         {getHoverString(1, true)}
    //     </div>
    // );
    // const terminal2 = (
    //     <div className="terminal-input">
    //         <strong>Terminal 2</strong> - {getHoverString(2, false)}{" "}
    //         {getHoverString(3, true)}
    //     </div>
    // );

    // const progress = (
    //     <div>
    //         <strong>Progress:</strong> {solved} / {numberOfSolutions}
    //     </div>
    // );

    // let terminalNumber = 1;
    // if (input.length >= 2) {
    //     terminalNumber = 2;
    // }
    // if (input.length >= 4) {
    //     terminalNumber = 3;
    // }
    // const inputSide = (input.length + 1) % 2 === 0 ? "Right" : "Left";

    // const solutionList = solutions
    //     .map((solution, index) => (
    //         <li key={solution[1]}>
    //             <strong>{index + 1}.</strong> {solution[1]}
    //         </li>
    //     ))
    //     .reverse();

    return (
        <div className="app">
            <h1>Destiny 2 Zero Hour Solver</h1>
            <h2>{getElementName(element)}</h2>
            <div className="filter-buttons">{filterList}</div>
            {/* <RoomMap solutions={solutions} />
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
            <p className="credit">
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
            <p className="credit">
                Credit to /u/floory565 for creating the spreadsheet that this
                solver's solutions are based on (
                <a
                    href="https://www.reddit.com/r/raidsecrets/comments/boryo5/heres_a_compact_and_concise_zero_hour_puzzle/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Link
                </a>
                )
            </p> 
            <hr /> */}
            <h2>Vault Route</h2>
            <h3>Normal</h3>
            <img
                className="route-map"
                src={FILTER_MAP[element]}
                alt="route map"
            />
            <p className="credit">
                Credit to /u/KPA for designing this route map (
                <a
                    href="https://www.reddit.com/r/DestinyTheGame/comments/brdehh/fire_room_solutions_solar_arc_void_configurations/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Link
                </a>
                )
            </p>
            <h3>Legend</h3>
            <img src="VaultRouteLegend.png" alt="Vault route on Legend" />
            <p className="credit">
                Credit to /u/Mellartach_55270 for designing this route map (
                <a
                    href="https://www.reddit.com/r/raidsecrets/comments/1crz7ts/zero_hour_floor_puzzle/l41qraq/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Link
                </a>
                )
            </p>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/pCDbZmsgn3Q?si=ZOn4YDVWkTKAX98M"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
            <hr />
            <h2>Switches (Outbreak Refined Quest)</h2>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/jo7LYrzY2uU?si=GzAgUETW5LRBKH57"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
            <hr />
            <h2>Vault Puzzle</h2>
            <img
                src="VaultPuzzleSolutionsWeek1.png"
                alt="Puzzle room solutions"
            />
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ApciPdFVpUg?si=odbQmahV3zWTu1FB"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
            <h3>How It Works</h3>
            <div className="how-to-guide">
                <p>
                    You will need to get a keypad and shoot 3 symbols with
                    Outbreak Perfected equipped before you can do the vault
                    puzzle. See the video guide above on where to find these.
                </p>
                <p>
                    There is a screen visible on the left when you enter the
                    vault. This screen can be seen in the image above. This
                    screen will indicate which terminals to activate for the
                    puzzle.
                </p>
                <p>
                    For the first week, the solutions will be below the{" "}
                    <strong>Square</strong> shape on the screen (in other words,
                    the first column), and the room at the bottom-left of the
                    screen will contain the solutions.
                </p>
                <p>
                    The arrows point (roughly) in the direction of the terminal
                    to activate if you stand in the center of each room.
                </p>
                <p>
                    For example, the first arrow points diagonally to the
                    top-right. Since the arrow is not highlighted in orange,
                    this arrow will point to the terminal just to the right of
                    the bottom-left room's entrance.
                </p>
                <p>
                    Similarly, the second arrow points diagonally to the
                    bottom-right. Again, this arrow isn't highlighted in orange,
                    so the terminal just to the left of the bottom-left room's
                    entrance will need to be activated.
                </p>
                <p>
                    The third arrow points to the bottom-left. This arrow is
                    highlighted in orange, so this arrow will actually point
                    towards the terminal at the bottom-left in the vault's
                    central room. This terminal will be to your immediate left
                    when you enter the vault's central room from the
                    incineration chamber.
                </p>
                <p>
                    Repeat this process until you get the reward for the vault
                    puzzle. The solutions may be randomized (not 100% sure), but
                    you can always follow this process to determine the solution
                </p>
                <p>
                    Below is an example of what the solution might look like,
                    along with the order of the terminals to activate.
                </p>
                <img
                    src="VaultPuzzleSolutionsWeek1Example.png"
                    alt="Example of a solution for week 1"
                />
            </div>
            <hr />
            <p className="alert">
                <strong>PLEASE READ:</strong> <br></br>
                This website is in the middle of an overhaul. The new version of{" "}
                <br></br>
                Zero Hour does not feature the same puzzle so the original
                solver and <br></br>
                guide are outdated. The vault route should be up to date (at{" "}
                <br></br>
                least for the normal version).
            </p>
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
            {/* <Guide element={element} getBorderColor={getBorderColor} /> */}
        </div>
    );
}

export default App;
