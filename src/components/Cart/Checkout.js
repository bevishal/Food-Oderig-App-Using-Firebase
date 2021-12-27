import { useRef, useState } from 'react';

import classes from './Checkout.module.css';


const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;
const isTenDig = (value) => value.trim().length === 10;

const Checkout = (props) => {

  const [formInputValidity, setFormInputValidity] = useState({
      name: true,
      phone: true,
      postal: true,
      address: true
  });


  const nameInputRef = useRef();
  const phone = useRef();
  const postalInputRef = useRef();
  const addressInputRef = useRef();


  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhone = phone.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;


    const NameIsValid = !isEmpty(enteredName);
    const phoneValid = isTenDig(enteredPhone);
    const isPostalValid = isSixChars(enteredPostal);
    const isAddressValid = !isEmpty(enteredAddress  )

    setFormInputValidity({
      name: NameIsValid,
      phone: phoneValid,
      postal: isPostalValid,
      address: isAddressValid
    })

    const isFormValid =
     (NameIsValid &&
       phoneValid &&
        isPostalValid &&
         isAddressValid
         );

    if (!isFormValid){
      return
    }

    props.onConfirm({
      name: enteredName,
      phone: enteredPhone,
      postal: enteredPostal,
      address: enteredAddress
    })

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} 
      ${formInputValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please Enter a valid name.</p>}
      </div>

      <div className={`${classes.control} 
      ${formInputValidity.phone ? '' : classes.invalid}`}>
        <label htmlFor='phone'>Phone No</label>
        <input type='text' id='phone' ref={phone} />
        {!formInputValidity.phone && <p>Please Enter a valid Phone No.</p>}
      </div>

      <div className={`${classes.control} 
      ${formInputValidity.postal ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputValidity.postal && <p>Please Enter a valid Postal Code (6 digit long).</p>}
      </div>

      <div className={`${classes.control} 
      ${formInputValidity.address ? '' : classes.invalid}`}>
        <label htmlFor='address'>Adress</label>
        <input type='text' id='address' ref={addressInputRef} />
        {!formInputValidity.address && <p>Please Enter a valid Address.</p>}
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