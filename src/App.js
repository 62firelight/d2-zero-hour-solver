import logo from "./logo.svg";
import "./App.css";
import FilterButton from "./components/FilterButton";
import { useState } from "react";

const FILTER_MAP = {
    Void: "./void.jpg",
    Solar: "./solar.jpg",
    Arc: "./arc.jpg",
};
const ELEMENTS = Object.keys(FILTER_MAP);

function App() {
    const [element, setElement] = useState("Void");

    function toggleRoute(element) {
        setElement(element);
    }

    const filterList = ELEMENTS.map((element) => {
        return (
            <FilterButton
                key={element}
                element={element}
                toggleRoute={toggleRoute}
            />
        );
    });

    return (
        <div className="app">
            <p>Currently set to: {element}</p>
            <div className="filter-buttons">{filterList}</div>
            <img src={FILTER_MAP[element]} />
        </div>
    );
}

export default App;
