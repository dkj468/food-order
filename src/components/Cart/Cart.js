import { useContext, useState } from 'react';
import useHttp from '../../hooks/use-http';
import CartContext from '../../store/CartContext';
import classes from '../Cart/Cart.module.css';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [isOrder, setIsOrder] = useState(false);
    const {isLoading, error, sendRequest: addOrder} = useHttp();
    const ctx = useContext(CartContext);
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const addItemHandler = (item) => {
        ctx.addItem({...item, quantity:1});
    }

    const removeItemHandler = (id) => {
        ctx.removeItem(id);
    }

    const orderClickHandler = () => {
        setIsOrder(true);
    }

    const submitOrderHandler = async (userData) => {
            addOrder({url: 'https://food-order-0617-default-rtdb.firebaseio.com/orders.json',
                      method:'POST',
                      body: {
                        userData,
                        items: ctx.items
                        }                     
                    }, null);
            props.onCartClose();
            
            // const data = await response.json();
            // console.log(data);
    }
    const cartItems = ctx.items.map(item => {
        return <CartItem 
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity} 
            onAdd={addItemHandler.bind(null, item)}
            onRemove={removeItemHandler.bind(null, item.id)}/>

    });

    // console.log(props);
    return (
        <Modal onClick={props.onCartClose}>
            <ul className={classes['cart-items']}>{cartItems}</ul>
            {hasItems ? 
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            : <div className={classes.total}><span>Your cart is empty</span></div>
            }
            {
                !isOrder &&
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onCartClose}>Close</button>
                    { hasItems && <button className={classes.button} onClick={orderClickHandler}>Order</button>}
                </div>
            }
            {isOrder && <Checkout onCancel={props.onCartClose} onConfirm={submitOrderHandler} />}
        </Modal>
    );
}

export default Cart;