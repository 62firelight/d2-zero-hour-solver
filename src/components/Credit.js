import React from "react";

function Credit(props) {
    return (
        <p className="credit">
            Credit to for{" "}
            <a href={props.link} target="_blank" rel="noreferrer">
                {props.username}
            </a>{" "}
            creating this route map
        </p>
    );
}

export default Credit;
