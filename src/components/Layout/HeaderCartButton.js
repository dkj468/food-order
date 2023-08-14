import classes from '../Layout/HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon"
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/CartContext';


const HeaderCartButton = props => {
    const ctx =  useContext(CartContext);
    const {items} = ctx;
    const [isBtnBump, setIsBtnBump] = useState(false);
    const itemCount = items.reduce((prevCount, item) => {
        return prevCount + item.quantity;
    }, 0);

    const btnClasses = `${classes.button} ${isBtnBump ? classes.bump: '' }`;

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setIsBtnBump(true);

        const timer = setTimeout(() => {
            setIsBtnBump(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);
    return(
        <button className={btnClasses} onClick={props.onCartClick} >
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{itemCount}</span>
        </button>
    )
}

export default HeaderCartButton;