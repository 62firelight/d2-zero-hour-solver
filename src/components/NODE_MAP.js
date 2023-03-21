import ArrayKeyedMap from "array-keyed-map";

const VOID_MAP = new ArrayKeyedMap([
    [[1, 1, 2], "White 1"],
    [[1, 1, 4], "Red 2"],
    [[1, 2], "Red 1"],
    [[4, 3, 2, 4], "Green 1"],
    [[4, 3, 2, 11], "Purple 6"],
]);
const SOLAR_MAP = new ArrayKeyedMap([
    [[1, 2], "Green 4"],
    [[1, 3], "Cyan 4"],
    [[1, 7, 2], "White 6"],
]);
const ARC_MAP = new ArrayKeyedMap([
    [[1, 4], "Red 6"],
    [[1, 6], "Yellow 7"],
    [[2, 4], "Green 3"],
]);
const NODE_MAP = new Map([
    ["Void", VOID_MAP],
    ["Solar", SOLAR_MAP],
    ["Arc", ARC_MAP],
]);

export default NODE_MAP;
