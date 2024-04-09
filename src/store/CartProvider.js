
import {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState= {
    items: [],
    totalAmount: 0
};

const cartReducer= (state, action)=> {
    
    if(action.type ==='ADD'){

        const updatedTotalAmount= state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex= state.items.findIndex(
            (item)=>item.id === action.item.id);
        //findIndex is js inbuild function witch will find index for each item in arry
        //findindex will return index value of item in arry

        const existingCartItem= state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem){
            const updatedItem= {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems= [...state.items];
            updatedItems[existingCartItemIndex]= updatedItem;
        } else{
             updatedItems = state.items.concat(action.item); //concat is a build in method that don't edit
            //old state/arry but gives brand new array
        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    };
    if(action.type === 'REMOVE'){
        const existingCartItemIndex= state.items.findIndex(
            (item)=>item.id === action.id);
        
        const existingItem= state.items[existingCartItemIndex];
        const updatedTotalAmount= state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems= state.items.filter((item)=>item.id !== action.id);
            //filter is a build in function that stores value in new arry if the function is true
            //if it returns false then the item is removed from array if the function is false
        }else{
            const updatedItem= {...existingItem, amount:existingItem.amount - 1};
            updatedItems= [...state.items];
            updatedItems[existingCartItemIndex]= updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
};

const CartProvider= (props)=> {

    const [cartState, dispatchCartAction]= useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler= (item)=>{
        dispatchCartAction({type:'ADD', item: item});
    };

    const removeItemFromCartHandler= (id)=>{
        dispatchCartAction({type:'REMOVE', id:id});
    };

    const cartContext= {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }


    return(
        <CartContext.Provider value={cartContext} >
            {props.children}
        </CartContext.Provider>
    );

};

export default CartProvider;