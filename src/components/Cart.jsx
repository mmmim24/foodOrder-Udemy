import React from 'react'
import Modal from './UI/Modal'
import { CartContext } from '../store/CartContext'
import { UserProgressContext } from '../store/UserProgressContext'
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';

export default function Cart() {
    const cartCtx = React.useContext(CartContext);
    const UPCtx = React.useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Modal className='cart' open={UPCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.quantity}
                    </li>
                ))}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={UPCtx.hideCart}>Close</Button>
                <Button onClick={UPCtx.hideCart}>Go to checkout</Button>
            </p>
        </Modal>
    )
}
