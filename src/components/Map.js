function Map(props) {
    const mostRecentSolution =
    props.solutions && props.solutions.length > 0 ? props.solutions[props.solutions.length - 1][1] : "";

    function getSplitSolution() {
        if (props.solutions === undefined || props.solutions.length <= 0) {
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
                        <td style={{ backgroundColor: "green" }} title="Green"></td>
                        <td></td>
                        <td></td>
                        <td style={{ backgroundColor: "black" }} title="Boss"></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td style={{ backgroundColor: "white" }} title="White"></td>
                        <td></td>
                        <td></td>
                        <td style={{ backgroundColor: "purple" }} title="Purple"></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td style={{ backgroundColor: "yellow" }} title="Yellow"></td>
                        <td></td>
                        <td></td>
                        <td style={{ backgroundColor: "blue" }} title="Blue"></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td style={{ backgroundColor: "red" }} title="Red"></td>
                        <td></td>
                        <td></td>
                        <td style={{ backgroundColor: "cyan" }} title="Cyan"></td>
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
