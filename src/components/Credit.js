import React from "react";

function Credit(props) {
    return (
        <p className="credit">
            Credit to{" "}
            <a href={props.link} target="_blank" rel="noreferrer">
                {props.username}
            </a>{" "}
            for creating this route map
        </p>
    );
}

export default Credit;
