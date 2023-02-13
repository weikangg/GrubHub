import React, {useRef, useState} from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
export default function MealItemForm(props) {
    const[amountisValid,setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event =>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        // convert to number
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmount > 5){
            setAmountIsValid(false);
            return;
        }
        else{
            props.onAddToCart(enteredAmountNumber)
        }
    }
    return (
        <form className={classes.form} onSubmit = {submitHandler}>
            <Input ref =  {amountInputRef} label='Amount' input={{
                id: 'amount' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!amountisValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
}
