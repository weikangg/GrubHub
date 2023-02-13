import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    // if nothing in the cart
    if (items.length === 0) {
      return;
    }
    // set the class on the cart
    setBtnIsHighlighted(true);
    // remove the class to set time out of 3s.
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300)

    // cleanup function to clear the timer
    return () => {
      clearTimeout(timer);
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
