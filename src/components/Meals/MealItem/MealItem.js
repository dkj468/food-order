import { useContext } from 'react';
import CartContext from '../../../store/CartContext';
import classes from '../MealItem/MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;
    const ctx = useContext(CartContext);
    const mealItemSubmitHandler = (quantity) => {
        const item = {id: props.id, name: props.name, quantity: quantity, price: props.price};
        ctx.addItem(item);
    }
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onSubmit={mealItemSubmitHandler}/>
            </div>
        </li>
    )
}

export default MealItem;