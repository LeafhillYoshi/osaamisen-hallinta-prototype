import React from "react";
import "./Card.css";

// Card component
const Card = (props) => {
    // Add the 'card' class to the div element
    const classes = 'card ' + props.className;

    return <div className={classes}>{props.children}</div>
}

export default Card;