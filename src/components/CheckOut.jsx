import React from 'react'
import Modal from './UI/Modal'
import { CartContext } from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import { UserProgressContext } from '../store/UserProgressContext';

export default function CheckOut() {
    const cartCtx = React.useContext(CartContext);
    const UPCtx = React.useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const userData = Object.fromEntries(fd.entries());

        fetch('http://localhost:3000/orders',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: {
                        items: cartCtx.items,
                        customer: userData,
                    }
                })
            });
    }

    return (
        <React.Fragment>
            <Modal open={UPCtx.progress === 'checkout'} onClose={() => UPCtx.hideCart()}>
                <form onSubmit={handleSubmit}>
                    <h2>Checkout</h2>
                    <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
                    <Input label="Full Name" type="text" id="full-name" />
                    <Input label="E-mail Address" type="email" id="email" />
                    <Input label="Street" type="text" id="street" />
                    <div className='control-row'>
                        <Input label="Postal Code" type="text" id="postal-code" />
                        <Input label="City" type="text" id="city" />
                    </div>
                    <p className='modal-actions'>
                        <Button type="button" onClick={() => UPCtx.hideCheckout()} textOnly >Close</Button>
                        <Button>Submit Order</Button>
                    </p>
                </form>
            </Modal>
        </React.Fragment>
    )
}
