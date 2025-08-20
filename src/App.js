import "./App.css";
// import FilterButton from "./components/FilterButton";
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

const ROUTE_VIDEOS = new Map([
    ["Void", "https://www.youtube.com/embed/tQ-fo2ZLmX8?si=4CZzRy6Oxvrl1dFS"],
    [
        "Solar",
        "https://www.youtube.com/embed/tQ-fo2ZLmX8?si=lII-ZppU9ewQxNgS&amp;start=38",
    ],
    [
        "Arc",
        "https://www.youtube.com/embed/tQ-fo2ZLmX8?si=RTutFKfdChorC_S2&amp;start=74",
    ],
]);

const PUZZLE_VIDEOS = new Map([
    ["Week 1", "https://www.youtube.com/embed/ApciPdFVpUg?si=Z79wd7NUiX1WqjhQ"],
    ["Week 2", "https://www.youtube.com/embed/W2p41zDNPlE?si=CMGs8xL4ZTerlT9K"],
    ["Week 3", "https://www.youtube.com/embed/HGFdKnt6C-Q?si=vQTFWeZsjRr3mhra"],
]);

function App() {
    const [currentWeek, setWeek] = useState("Week 1");
    const [currentThreat, setThreat] = useState("Arc");

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

    const filterList = WEEKS.map((week) => {
        return (
            <button
                key={week}
                className="filter-button"
                onClick={() => setWeek(week)}
                style={{
                    border:
                        currentWeek === week
                            ? `4px solid black`
                            : "4px solid transparent",
                }}
            >
                {week}
            </button>
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
            >
                {threat}
            </button>
        );
    });

    function getRouteVideoUrl(threat) {
        return ROUTE_VIDEOS.get(threat);
    }

    function getPuzzleVideoUrl(week) {
        return PUZZLE_VIDEOS.get(week);
    }

    const routeVideo = getRouteVideoUrl(currentThreat) ? (
        <iframe
            width="560"
            height="315"
            src={getRouteVideoUrl(currentThreat)}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    ) : undefined;

    const puzzleVideo = getPuzzleVideoUrl(currentWeek) ? (
        <iframe
            width="560"
            height="315"
            src={getPuzzleVideoUrl(currentWeek)}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    ) : (
        <p
            className="how-to-guide"
            style={{
                textAlign: "center",
            }}
        >
            No video guide exists for this week.
        </p>
    );

    function getSolutionsLocation(week) {
        switch (week) {
            case "Week 1":
                return (
                    <p>
                        For Week 1, the solutions will be below the{" "}
                        <strong>Square</strong> shape on the screen (in other
                        words, the first column), and the room on the
                        bottom-left of the map will contain the solutions.
                    </p>
                );
            case "Week 2":
                return (
                    <p>
                        For Week 2, the solutions will be below the{" "}
                        <strong>Diamond</strong> shape on the screen (in other
                        words, the second column), and the room below the
                        "OFFLINE" room on the top-left of the map will contain
                        the solutions.
                    </p>
                );
            case "Week 3":
                return (
                    <p>
                        For Week 3, the solutions will be below the sideways{" "}
                        <strong>Trapezium</strong> shape on the screen (in other
                        words, the third column), and the only room on the
                        right-side of the map that isn't marked with "ERROR" or
                        "OFFLINE" will contain the solutions.
                    </p>
                );
            default:
                return undefined;
        }
    }

    function getExamples(week) {
        switch (week) {
            case "Week 1":
                return (
                    <div>
                        <p>
                            For example, the first arrow points diagonally to
                            the top-right. Since the arrow is not highlighted in
                            orange, this arrow will point to the terminal just
                            to the right of the bottom-left room's entrance.
                        </p>
                        <p>
                            Similarly, the second arrow points diagonally to the
                            bottom-right. Again, this arrow isn't highlighted in
                            orange, so the terminal just to the left of the
                            bottom-left room's entrance will need to be
                            activated.
                        </p>
                        <p>
                            The third arrow points to the bottom-left. This
                            arrow is highlighted in orange, so this arrow will
                            actually point towards the terminal at the
                            bottom-left in the vault's central room. This
                            terminal will be to your immediate left when you
                            enter the vault's central room from the incineration
                            chamber.
                        </p>
                        <p>
                            Repeat this process until you get the reward for the
                            vault puzzle.
                        </p>
                        <p>
                            The image above is an example of what the solution
                            might look like, along with the order of the
                            terminals to activate.
                        </p>
                    </div>
                );
            case "Week 2":
                break;
            case "Week 3":
                break;
            default:
                return undefined;
        }
    }

    return (
        <div className="app">
            <h1>Zero Hour Solver</h1>
            <nav>
                <h2>Quick Links</h2>
                <a href="#fire-room-route">Fire Room Route</a>
                <a href="#vault-puzzle">Vault Puzzle</a>
                <a href="#outbreak-refined-1-switches">Outbreak Refined I Switches</a>
                <a href="#outbreak-refined-2-switches">Outbreak Refined II Switches</a>
                <a href="#outbreak-refined-3-switches">Outbreak Refined III Switches</a>
                <a href="#infinite-time-glitch">Infinite Time Glitch</a>
                <a href="#about">About</a>
            </nav>
            <h2 id="fire-room-route">Fire Room Route</h2>
            <div className="filter-buttons">{threatFilters}</div>
            <h3>Showing routes for {currentThreat} Threat</h3>
            (click buttons above to change routes)
            <img
                className="route-map"
                src={`VaultRoute${currentThreat}ThreatNormal.png`}
                alt="Route map for Normal"
            />
            <img
                className="route-map"
                src={`VaultRoute${currentThreat}ThreatLegend.png`}
                alt="Route map for Legend"
            />
            <Credit
                username="/u/isurvivorz"
                link="https://www.reddit.com/r/raidsecrets/comments/1ct6ah1/zero_hour_fire_room_paths/"
            />
            {routeVideo}
            <hr />
            <h2 id="vault-puzzle">Vault Puzzle</h2>
            <div className="filter-buttons">{filterList}</div>
            <h3>Showing solution for {currentWeek} </h3>
            (click buttons above to change solutions)
            <div className="how-to-guide">
                <img
                    src={`VaultPuzzleMap${currentWeek.replaceAll(" ", "")}.png`}
                    alt={`Example of a solution for ${currentWeek}`}
                />
                <h3>Video Guide ({currentWeek})</h3>
                {puzzleVideo}
                <h3>How It Works</h3>

                <p>
                    You will need to shoot 3 symbols with Outbreak Perfected
                    equipped before you can do the vault puzzle. See the video
                    guide above on where to find these symbols.
                </p>
                <p>
                    There is a screen visible on the left when you enter the
                    vault. This screen can be seen in the image above. This
                    screen will indicate which terminals to activate for the
                    puzzle.
                </p>
                {getSolutionsLocation(currentWeek)}
                <p>
                    The arrows point (roughly) in the direction of the terminal
                    to activate if you stand in the center of each room.
                </p>
                {getExamples(currentWeek)}
            </div>
            <hr />
            <h2 id="outbreak-refined-1-switches">Outbreak Refined I Switches</h2>
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
            <h2 id="outbreak-refined-2-switches">Outbreak Refined II Switches</h2>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/-nlk60SYH1U?si=fFxuGlonU5qIWcY-"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
            <h2 id="outbreak-refined-3-switches">Outbreak Refined III Switches</h2>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/2fnH5QoRkeA?si=6bxCHi7ixsK6A5ie"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
            <hr />
            <div className="time-glitch">
                <h2 id="infinite-time-glitch">Infinite Time Glitch</h2>
                <p>
                    The first minute and a half shows how to perform the glitch.
                    The rest of the video shows a full Zero Hour run using the
                    glitch.
                </p>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/HZKgDvrILG4?si=kPqnUP2juR4qT8-t"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
                <p>
                    Note that doing a vault puzzle with this glitch active will
                    cause a 60 second timer to appear again. Going to the boss
                    room will cause the timer to disappear, but you will be sent
                    back to orbit if you don't make it in time. The source for
                    this information comes from the comments section for the
                    video above and{" "}
                    <a
                        href="https://www.reddit.com/r/DestinyTheGame/comments/1d64geu/i_made_a_website_that_compiles_everything_you/l6sb5de/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        /u/Makeshift27015
                    </a>
                    .
                </p>
            </div>
            <hr />
            <div id="about"></div>
            <p>
                Videos were created by{" "}
                <a
                    href="https://www.youtube.com/@360GameTV"
                    target="_blank"
                    rel="noreferrer"
                >
                    360GameTV
                </a>
                ,{" "}
                <a
                    href="https://www.youtube.com/@Esoterickk"
                    target="_blank"
                    rel="noreferrer"
                >
                    Esoterickk
                </a>{" "}
                and{" "}
                <a
                    href="https://www.youtube.com/@CheeseForever"
                    target="_blank"
                    rel="noreferrer"
                >
                    Cheese Forever
                </a>
                .
            </p>
            Created by 62firelight
            <a
                href="https://github.com/62firelight/d2-zero-hour-solver"
                target="_blank"
                rel="noreferrer"
            >
                GitHub
            </a>
            <br></br>
            <br></br>
        </div>
    );
}

export default App;
