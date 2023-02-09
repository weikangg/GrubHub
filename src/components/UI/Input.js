import React from 'react'
import classes from './Input.module.css';
export default function Input(props) {
  return (
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        {/* // spread operator to open the props object and get all the props on the input */}
        <input {... props.input}/>
    </div>
  )
}
