import { useReducer } from "react";
import CartContext from "./CartContext";


const defaultCartState = {
    items:[],
    totalAmount:0
}

const cartReducer = (prevState, action) => {

    if(action.type === 'ADD') {
        const updatedTotalAmount = prevState.totalAmount + (action.item.price * action.item.quantity);
        const itemIndex = prevState.items.findIndex(item => item.id === action.item.id);
        const existingItem = prevState.items[itemIndex];
        let updatedItems;
        if(existingItem){
            const updatedItem = {...existingItem, quantity : existingItem.quantity + action.item.quantity};
            updatedItems = [...prevState.items];
            updatedItems[itemIndex] = updatedItem;
        } else {
            updatedItems = prevState.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE') {
        const itemIndex = prevState.items.findIndex(item => item.id === action.id);
        const existingItem = prevState.items[itemIndex];
        let updatedItems;
        if(existingItem.quantity === 1) 
        {
            updatedItems = prevState.items.filter(item => item.id !== action.id);
        } 
        else 
        {
            const updatedItem = {...existingItem, quantity: existingItem.quantity - 1};
            updatedItems = [...prevState.items];
            updatedItems[itemIndex] = updatedItem;
        }
        const updatedTotalAmount = prevState.totalAmount - existingItem.price;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
}
const CartProvider = props => {

    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
    
    const addItemHandler = (item) => {
        dispatchCart({type:'ADD', item:item});
    }

    const removeItemHandler = id => {
        dispatchCart({type:'REMOVE', id:id});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount:cartState.totalAmount,
        addItem : addItemHandler,
        removeItem: removeItemHandler
    }

    
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;