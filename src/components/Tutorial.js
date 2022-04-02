import React from 'react'
import styles from "./Tutorial.module.css";
const instructions=["You can click on cells to create hurdles for rat.", "After that click on \"go rat\" button and then let the rat figure out how to reach destination.😊"];
const Tutorial = ({handleClose}) => {
  return (
    <div className={styles.tutCont}>
        <h1 >Welcome to Rat in maze Problem!</h1>
        <h2>Instructions:</h2>
        {instructions.map(each=> <p><span style={{fontWeight : "bolder"}}>=&gt;</span>  {each}</p>)}
        <div style={{textAlign : "center"}}><button className={styles.btn} onClick={handleClose}>sure</button></div>
        
    </div>
  )
}

export default Tutorial