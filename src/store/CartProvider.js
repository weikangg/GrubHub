import React, {useReducer} from 'react'
import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount:0
}

// returns old state snapshot and action you have to take
const cartReducer = (state,action) =>{
    if (action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
        // find index if the id exists in the list of items === to the id of the id that u want to add.
        // returns the index if found.
        const existingCartItemIndex = state.items.findIndex(item =>item.id ===action.item.id);
        
        // will be null or that item
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        // if it already exists, we just adjust the amount
        if (existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                // override the amount
                amount : existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        // else , we will add it to the list
        else{
            updatedItems = state.items.concat(action.item);
        }

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    
    if (action.type ==='REMOVE'){

        const existingCartItemIndex = state.items.findIndex(item =>item.id ===action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1){
            // filter and remove that particular item from the new array.
            updatedItems = state.items.filter(item =>item.id !== action.id );
        }else{
            const updatedItem = {...existingItem, amount:existingItem.amount-1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }

    if (action.type ==='CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;
}

export default function CartProvider(props) {
    // state snapshot, dispatch Action
    const [cartState,dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item:item});
    };
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type:'REMOVE', id:id});
    };
    const clearCartHandler = () =>{
        dispatchCartAction({type:'CLEAR'})
    }
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart:clearCartHandler
    }
  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}
