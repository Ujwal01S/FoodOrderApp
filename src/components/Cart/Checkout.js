import classes from './Checkout.module.css'
import { useRef, useState } from 'react';
//parent component
const isEmpty = (value)=> value.trim() === '';
const isFiveChars= (value)=>value.length === 5;

const Checkout= (props)=>{

    const [formInputsValidity, setFormInputsValidity] = useState({
        name:true,
        street:true,
        city:true,
        postalCode: true
    });

    const nameInputRef= useRef();
    const streetInputRef= useRef();
    const postalCodeInputRef= useRef();
    const cityInputRef= useRef();



    const confirmHandler= (event)=> {
        event.preventDefault();
        const enteredName= nameInputRef.current.value;
        const enteredStreet= streetInputRef.current.value;
        const enteredPostalCode= postalCodeInputRef.current.value;
        const enteredCity= cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
        
        console.log(enteredCityIsValid);
        setFormInputsValidity({
            name:enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        });

        const formIsValid = 
        enteredNameIsValid && 
        enteredStreetIsValid && 
        enteredCityIsValid && 
        enteredPostalCodeIsValid;

        if(!formIsValid){
            return;
        }
        props.onConfirm({
          name: enteredName,
          street: enteredStreet,
          city: enteredCity,
          postalCode: enteredPostalCode

        });
    };
    
            //  below i will be using tempral literal to ifelse css 
    const nameControlClassses= `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const streetControlClassses= `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
    const cityControlClassses= `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;
    const postalCodeControlClassses= `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;

    return(
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClassses}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef}/>
          {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={streetControlClassses}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef}/>
          {!formInputsValidity.street && <p>Please enter a valid street!</p>}
        </div>
        <div className={postalCodeControlClassses}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalCodeInputRef}/>
          {!formInputsValidity.postalCode && <p>Please enter a valid postalCode!</p>}
        </div>
        <div className={cityControlClassses}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef}/>
          {!formInputsValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
};

export default Checkout;