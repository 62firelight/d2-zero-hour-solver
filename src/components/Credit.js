import React from "react";

function Credit(props) {
    return (
        <p className="credit">
            Credit to {props.username} for creating this route map (
            <a href={props.link} target="_blank" rel="noreferrer">
                Link
            </a>
            )
        </p>
    );
}

export default Credit;
