import Map from "./RoomMap";

function Guide(props) {
    let video = "";

    switch (props.element) {
        case "Void":
            video = (
                <div className="video">
                    <p>
                        Here is a video of Esoterickk doing the puzzle solo
                        during a{" "}
                        <span
                            style={{
                                color: props.getBorderColor(props.element),
                            }}
                        >
                            Void
                        </span>{" "}
                        Configuration week (puzzle starts at 14:25):
                    </p>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/DiEF7MMsXNM?si=yPL3EtFXScuw4R3F&amp;start=865"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </div>
            );
            break;
        case "Solar":
            video = (
                <div className="video">
                    <p>
                        Here is a video of Esoterickk doing the puzzle solo
                        during a{" "}
                        <span
                            style={{
                                color: props.getBorderColor(props.element),
                            }}
                        >
                            Solar
                        </span>{" "}
                        Configuration week (puzzle starts at 13:20):
                    </p>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/5IiDuHv6Xgs?si=bXVF-4GxyuniJrRb&amp;start=800"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </div>
            );
            break;
        case "Arc":
            video = (
                <div className="video">
                    <p>
                        Here is a video of Esoterickk doing the puzzle solo
                        during a{" "}
                        <span
                            style={{
                                color: props.getBorderColor(props.element),
                            }}
                        >
                            Arc
                        </span>{" "}
                        Configuration week (puzzle starts at 13:15):
                    </p>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/33DsqihNJ8E?si=vm4BRhCQDKSPCwLB&amp;start=795"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </div>
            );
            break;
        default:
            break;
    }

    return (
        <div className="how-to-guide">
            <h2>Video Example</h2>
            {video}
            <h2>Text Guide</h2>
            {/* image of exhibit room */}
            <img src="./ExhibitRoom.png" alt="Exhibit room" />
            <p>
                The puzzle is located before the final boss of the{" "}
                <strong>Zero Hour mission. </strong>
                Specifically, it is inside the{" "}
                <strong>large exhibit room</strong> just after the white tile
                room that will incinerate any players inside it if the wrong
                tile is stepped on, and just before dropping down the hole into
                the passage that leads to the boss fight. See the map below or
                at the <a href="#map">top of this page</a> to see the layout of
                the exhibit room.
            </p>

            <p>
                Remember to have collected the{" "}
                <span style={{ color: "blue" }}>Blue</span>,{" "}
                <span style={{ color: "green" }}>Green</span> and{" "}
                <span style={{ color: "red" }}>Red</span> keycards beforehand to
                gain the reward associated with the puzzle.
            </p>
            <h3>Map</h3>
            <Map />
            <p>
                The exhibit room has 8 rooms running along the left and right
                sides. <strong>7 of these rooms</strong> have a colour
                associated with them and are used for the puzzle. The Black room
                on the far-right side of the room has a hole that leads to the
                boss fight and is not used for the puzzle. The rooms used for
                the puzzle are (from left to right, top to bottom in the map){" "}
                <span style={{ color: "green" }}>Green</span>,{" "}
                <span style={{ color: "gray" }}>White</span>,{" "}
                <span style={{ color: "purple" }}>Purple</span>,{" "}
                <span style={{ color: "#8B8000" }}>Yellow</span>,{" "}
                <span style={{ color: "blue" }}>Blue</span>,{" "}
                <span style={{ color: "red" }}>Red</span> and{" "}
                <span style={{ color: "cyan" }}>Cyan</span>.
            </p>
            <p>
                Inside each of these 7 coloured rooms are{" "}
                <strong>7 servers</strong> located in specific positions. They
                are marked 1 to 7 according to their position. On the map above,
                the servers and their positions can be seen in the middle.
            </p>
            {/* image of room interior */}
            <img src="./ExhibitRoomInterior.png" alt="Exhibit room" />
            <p>
                The goal of the puzzle is to{" "}
                <strong>activate all 49 servers</strong>. However, the order in
                which they are activated depends on <strong>3 terminals</strong>{" "}
                located around the room and the{" "}
                <strong>configuration element</strong> (which changes each
                week).
            </p>
            <p>
                On each terminal are <strong>2 circles</strong> with thick
                edges. The edges are divided into <strong>12 sections</strong>,
                like a clock. Going clockwise, these sections are numbered 1 to
                12. <strong>1 of these sections</strong> will be{" "}
                <strong>highlighted in yellow</strong> for each circle. This
                highlighted section needs to be read out as a number. The
                combination of numbers on the terminals indicates which server
                must be activated.
            </p>
            {/* image of terminal and their locations */}
            <img src="./WheelNumbers.png" alt="Numbers for the circles" />
            <p>
                For example, if 5 and 9 are highlighted on terminal 1 during a
                void configuration (like in the screenshot above), the server at{" "}
                <span style={{ color: "purple" }}>Purple 7</span> must be
                activated by running up to it and interacting with it (you will
                get a <strong>"Lock Sequence"</strong> prompt like in the
                screenshot below). Once{" "}
                <span style={{ color: "purple" }}>Purple 7</span> has been
                activated, the terminal(s) will change numbers and will need to
                be read again to find the next server to activate.{" "}
            </p>
            <img
                src="LockSequence.png"
                alt="Lock Sequence prompt when interacting with a server"
            />
            <p>
                <strong>In some cases, numbers from another terminal</strong>{" "}
                need to be read in order to narrow down the specific server to
                activate. Only a maximum of 2 terminals are required to complete
                the puzzle.
            </p>
            <p>
                If the wrong server is activated, that server's screen will
                appear red and needs to be deactivated by interacting with it
                again.
            </p>
            <p>
                Once ready, the puzzle can be started by interacting with one of
                the three terminals. A <strong>"Begin Sequencing"</strong>{" "}
                prompt will appear when looking at a terminal.
            </p>
            <img
                src="./BeginSequencing.png"
                alt="Begin Sequencing prompt when looking at one of the terminals"
            />
            <p>
                Once all 49 servers have been activated, a noise will play and
                the quest associated with the puzzle should complete (assuming
                all 3 keycards were collected).
            </p>
            <h3>Using the Solver</h3>
            <p>
                For the sake of simplicity, this solver will only be focusing on
                the{" "}
                <strong>
                    2 terminals located on the left side of the exhibit room
                </strong>
                , though the 3rd terminal on the right side of the room may be
                used as well.
            </p>
            <p>
                Position yourself at terminal 1. Read the numbers from terminal
                1 and click the corresponding numbers on the solver app's
                circle. In case you lose track of which terminal or circle you
                are reading for, you can look at the text highlighted in{" "}
                <strong>bold</strong> below the map. This is important as you
                may need to read the numbers from terminal 2 as well.
            </p>
            <p>
                Once a sequence of numbers has been entered, the location of the
                server will be shown on the map (e.g. "
                <span style={{ color: "cyan" }}>Cyan 5</span>
                "), along with the location of the server within the room. Keep
                in mind that the solver will reset itself to the left circle of
                terminal 1 for each successful sequence of numbers that are
                read.
            </p>
            <p>
                The solver will automatically keep track of what servers have
                and haven't been activated. If you enter the wrong number and/or
                get the wrong server, you can click the{" "}
                <strong>Clear Terminals</strong> or <strong>Undo</strong>{" "}
                buttons to clear the terminals in the solver or de-activate the
                last activated server.
            </p>
            <h3>Notes</h3>
            <ul>
                <li>
                    When activating the correct server, 15 seconds will be added
                    to the mission timer.
                </li>
                <li>
                    <strong>Terminal 1</strong> is located between the entrances
                    to the <span style={{ color: "green" }}>Green</span> and{" "}
                    <span style={{ color: "gray" }}>White</span> rooms.
                </li>
                <li>
                    <strong>Terminal 2</strong> is located between the entrances
                    to the <span style={{ color: "#8B8000" }}>Yellow</span> and{" "}
                    <span style={{ color: "red" }}>Red</span> rooms.
                </li>
                <li>
                    <strong>Terminal 3</strong> is located between the entrances
                    to the <span style={{ color: "blue" }}>Blue</span> and{" "}
                    <span style={{ color: "cyan" }}>Cyan</span> rooms.
                </li>
                <li>It is possible to complete the puzzle solo.</li>
            </ul>
        </div>
    );
}

export default Guide;
