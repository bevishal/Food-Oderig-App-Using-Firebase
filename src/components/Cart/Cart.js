import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false)

  const [isSubmittig, setIsSubmmiting] = useState(false);

  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setCheckout(true)
  };


  const submitOrderHandler = async (userData) => {
    setIsSubmmiting(true)
    await fetch('https://usehttp-82908-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
      
    });
    setIsSubmmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

      const modelActions = <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>

  const cartModelContent = (
    <React.Fragment>
      
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckout && modelActions}
    </React.Fragment>
  );

  const isSubmmitingContent = <p>Sending order data!</p>

  const didSubmitModelContent = <React.Fragment>
    <p>Successfully order placed!</p>
    <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
  </React.Fragment> 



  return (
    <Modal onClose={props.onClose}>
      {!isSubmittig && !didSubmit && cartModelContent}
      {isSubmittig && isSubmmitingContent}
      {!isSubmittig && didSubmit && didSubmitModelContent}

    </Modal>
  );
};

export default Cart;
