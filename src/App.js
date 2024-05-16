import "./App.css";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
// import TerminalButtons from "./components/TerminalButtons";
// import Guide from "./components/Guide";
// import ArrayKeyedMap from "array-keyed-map";
// import NODE_MAP from "./components/NODE_MAP";
import FILTER_MAP from "./components/FILTER_MAP";
import Credit from "./components/Credit";
// import ReactConfetti from "react-confetti";
// import RoomMap from "./components/RoomMap";

const WEEKS = Object.keys(FILTER_MAP);

const THREATS = ["Arc", "Void", "Solar"];

const THREAT_COLORS = new Map([
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
    const [week] = useState("Week 1");
    const [currentThreat, setThreat] = useState("Arc");

    // function getWeekName(week) {
    //     return WEEK_NAMES.get(week);
    // }

    const firstDate = new Date(Date.UTC(1024, 5, 14, 17));
    const now = new Date(); // today
    const secondDate = new Date(
        Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDay(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
            now.getMilliseconds()
        )
    );
    console.log(":D " + secondDate);

    // const millisecondsDiff = secondDate.getTime() - firstDate.getTime();

    // const daysDiff = Math.round(millisecondsDiff / (24 * 60 * 60 * 60));

    function getThreatColor(currentThreat) {
        return THREAT_COLORS.get(currentThreat);
    }

    function getBorderColor() {
        let color = BORDER_COLORS.get(currentThreat);

        if (color === undefined) {
            return "black";
        }

        return color;
    }

    const filterList = WEEKS.map((name) => {
        return (
            <FilterButton
                key={name}
                week={name}
                isPressed={name === week}
                // toggleElement={toggleElement}
                // getWeekColor={getWeekColor}
                getBorderColor={getBorderColor}
            />
        );
    });

    const threatFilters = THREATS.map((threat) => {
        return (
            <button
                key={threat}
                className="filter-button"
                style={{
                    backgroundColor: getThreatColor(threat),
                    border:
                        currentThreat === threat
                            ? `8px solid ${getBorderColor(threat)}`
                            : "8px solid transparent",
                }}
                onClick={() => setThreat(threat)}
                disabled={threat === "Solar"}
            >
                {threat}
            </button>
        );
    });

    return (
        <div className="app">
            <h1>Destiny 2 Zero Hour Solver</h1>
            <h2>{week}</h2>
            <div className="filter-buttons">{filterList}</div>
            <h2>Vault Route</h2>
            <h3>Current Threat: {currentThreat}</h3>
            <div className="filter-buttons">{threatFilters}</div>
            <img
                className="route-map"
                src={`VaultRoute${currentThreat}ThreatNormal.png`}
                alt="route map"
            />

<img
                className="route-map"
                src={`VaultRoute${currentThreat}ThreatLegend.png`}
                alt="route map"
            />
            <Credit
                username="/u/isurvivorz"
                link="https://www.reddit.com/r/raidsecrets/comments/1ct6ah1/zero_hour_fire_room_paths/"
            />
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
