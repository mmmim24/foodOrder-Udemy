import React from 'react'
import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import { CartContext } from '../store/CartContext'
import { UserProgressContext } from '../store/UserProgressContext'

export default function Header() {
    const UPCtx = React.useContext(UserProgressContext);
    const cartCtx = React.useContext(CartContext);
    const cartItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);

    return <header id="main-header">
        <div id="title">
            <img src={logo} />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly onClick={UPCtx.showCart}>Cart {cartItems}</Button>
        </nav>
    </header>
}
