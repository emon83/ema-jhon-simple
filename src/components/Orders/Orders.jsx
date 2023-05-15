import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const saveCart = useLoaderData();
    const  [cart, setCart] = useState(saveCart);

    const handleRemoveFromCart = (id) => {
        const remainingCart = cart.filter(product => product._id !== id);
        setCart(remainingCart);
        removeFromDb(id);

    }

    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    console.log(saveCart);
    return (
        <div className='shop__container'>
            <div className='review__container'>
            {
                cart.map(product => <ReviewItem
                    key={product._id}
                    product={product}
                    handleRemoveFromCart={handleRemoveFromCart}
                ></ReviewItem>)
            }
            </div>
            <div className='cart__container'>
                <Cart
                cart={cart}
                handleClearCart={handleClearCart}
                >
                    <Link to="/checkout">
                        <button className='btn__proceed'>Proceed Checkout
                        <FontAwesomeIcon className="credit__card__icon"  icon={faCreditCard} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;