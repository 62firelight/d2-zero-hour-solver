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
const WEEK_NAMES = new Map([
    ["Week 1", "Week 1"],
    ["Week 2", "Week 2"],
    ["Week 3", "Week 3"],
]);
const WEEK_COLORS = new Map([
    ["Week 1", "fuchsia"],
    ["Week 2", "orange"],
    ["Week 3", "lightblue"],
]);
const BORDER_COLORS = new Map([
    ["Week 1", "purple"],
    ["Week 2", "rgb(121, 79, 0)"],
    ["Week 3", "rgb(36, 99, 119)"],
]);

function App() {
    const [week] = useState("Week 1")

    function getWeekName(week) {
        return WEEK_NAMES.get(week);
    }

    function getWeekColor(week) {
        return WEEK_COLORS.get(week);
    }

    function getBorderColor() {
        let color = BORDER_COLORS.get(week);

        if (color === undefined) {
            return "black";
        }

        return color;
    }

    const filterList = ELEMENTS.map((name) => {
        return (
            <FilterButton
                key={name}
                week={name}
                isPressed={name === week}
                // toggleElement={toggleElement}
                getWeekColor={getWeekColor}
                getBorderColor={getBorderColor}
            />
        );
    });

    return (
        <div className="app">
            <h1>Destiny 2 Zero Hour Solver</h1>
            <h2>{week}</h2>
            <div className="filter-buttons">{filterList}</div>
            <h2>Vault Route</h2>
            <h3>Normal</h3>
            <img
                className="route-map"
                src="VaultRouteNormalWeek1.png"
                alt="route map"
            />
            <p className="credit">
                Credit to /u/ImawhaleCR for creating this route map (
                <a
                    href="https://www.reddit.com/r/raidsecrets/comments/1crz7ts/zero_hour_floor_puzzle/l41hnu3/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Link
                </a>
                )
            </p>
            <h3>Legend</h3>
            <img
                className="route-map"
                src="VaultRouteLegendWeek1.png"
                alt="Vault route on Legend"
            />
            <p className="credit">
                Credit to /u/Mellartach_55270 for creating this route map (
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
            <img
                src="VaultPuzzleSolutionsWeek1.png"
                alt="Puzzle room solutions"
            />
            <img
                src="VaultPuzzleSolutionsWeek1Example.png"
                alt="Example of a solution for week 1"
            />
            <h3>How It Works</h3>
            <div className="how-to-guide">
                <p>
                    You will need to shoot 3 symbols with Outbreak Perfected
                    equipped before you can do the vault puzzle. See the video
                    guide above on where to find these.
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
                    puzzle.
                </p>
                <p>
                    The second image above is an example of what the solution
                    might look like, along with the order of the terminals to
                    activate.
                </p>
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
            <hr />
        </div>
    );
}

export default App;
