import React from 'react';
import Input from '../../UI/Input';
import classes from '../MealItem/MealItemForm.module.css';

const MealItemForm = props => {
    const inputRef = React.createRef();

    const submitMealItemHandler = (e) => {
        e.preventDefault();
        props.onSubmit(inputRef.current.value * 1);
    }
    return(
        <form className={classes.form} onSubmit={submitMealItemHandler}>
            <Input
                ref={inputRef}
                label = 'amount'
                input = {{
                    id:'amount' + props.id,
                    type:'number', 
                    min:'1', 
                    max:'5', 
                    step:'1', 
                    defaultValue:'1'
                }}
            />
            <button>+ Add</button>
        </form>
    )
}

export default MealItemForm;