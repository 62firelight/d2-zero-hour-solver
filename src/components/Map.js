function Map(props) {
    const mostRecentSolution =
        props.solutions.length > 0 ? props.solutions[props.solutions.length - 1][1] : "";

    function getSplitSolution() {
        if (props.solutions.length <= 0) {
            return undefined;
        }

        return mostRecentSolution.split(" ");
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

    return (
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
    );
}

export default Map;
