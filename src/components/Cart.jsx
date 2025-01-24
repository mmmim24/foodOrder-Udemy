import React from 'react'
import Modal from './UI/Modal'
import { CartContext } from '../store/CartContext'
import { UserProgressContext } from '../store/UserProgressContext'
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import CartItem from './CartItem';

export default function Cart() {
    const cartCtx = React.useContext(CartContext);
    const UPCtx = React.useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Modal
            className='cart'
            open={UPCtx.progress === 'cart'}
            onClose={UPCtx.progress === 'cart' ? () => UPCtx.hideCart() : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <CartItem
                        key={item.id}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                        onIncrease={() => cartCtx.addItem(item)}
                        {...item}
                    />
                ))}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={() => UPCtx.hideCart()}>Close</Button>
                {cartCtx.items.length && <Button onClick={() => UPCtx.showCheckout()}>Go to checkout</Button>}
            </p>
        </Modal>
    )
}
