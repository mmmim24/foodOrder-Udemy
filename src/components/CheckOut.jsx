import React from 'react'
import Modal from './UI/Modal'
import { CartContext } from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import { UserProgressContext } from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function CheckOut() {
    const cartCtx = React.useContext(CartContext);
    const UPCtx = React.useContext(UserProgressContext);

    const { data, isLoading, error, sendRequest, clearData } = useHttp(
        'http://localhost:3000/orders',
        requestConfig
    );

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleFinish() {
        UPCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const userData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: userData,
            }
        }));
    }

    let actions = (
        <>
            <Button type="button" onClick={() => UPCtx.hideCheckout()} textOnly >Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isLoading) {
        actions = <span> Sending order data...</span>;
    }

    if (data && !error) {
        return <Modal open={UPCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully!</p>
            <p>We will get back to you with more details via email within few minutes.</p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
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
                    {error && <Error title="Failed to submit order" message={error} />}
                    <p className='modal-actions'>{actions}</p>
                </form>
            </Modal>
        </React.Fragment>
    )
}
