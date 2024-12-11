import React from "react";
import "./Card.css";

// Card component
// This component is a wrapper for other components
const Card = (props) => {
    // Add the 'card' class to the div element
    const classes = 'card ' + props.className;

    return <div className={classes}>{props.children}</div>
}

export default Card;