import React from 'react'
import Modal from './UI/Modal'
import { CartContext } from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';

export default function CheckOut() {
    const cartCtx = React.useContext(CartContext);
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    return (
        <React.Fragment>
            <Modal>
                <form>
                    <h2>Checkout</h2>
                    <p>Total Amount: {currencyFormatter.form(cartTotal)} </p>
                    <Input label="Full Name" type="text" id="full-name" />
                </form>
            </Modal>
        </React.Fragment>
    )
}
