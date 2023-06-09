import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die_box" style={styles} onClick={props.holdDice}>
            <h2 className = "die_num">{props.value}</h2>
            
        </div>
        
    )
}