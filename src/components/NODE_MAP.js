import ARC_MAP from "./ARC_MAP";
import SOLAR_MAP from "./SOLAR_MAP";
import VOID_MAP from "./VOID_MAP";

const NODE_MAP = new Map([
    ["Void", VOID_MAP],
    ["Solar", SOLAR_MAP],
    ["Arc", ARC_MAP],
]);

export default NODE_MAP;
