import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({product, handleRemoveFromCart}) => {
    const {_id, img, price, name, quantity} = product;
    return (
        <div className='review__item'>
            <img src={img} alt="" />
            <div className='review__details'>
                <p className='product__title'>{name}</p>
                <p>Price: <span className='text__orange'>${price}</span></p>
                <p>Shipping Charge: <span className='text__orange'>{quantity}</span></p>
            </div>
            <button onClick={ () => handleRemoveFromCart(_id)} className='btn__delete'><FontAwesomeIcon className='delete__icon' icon={faTrashAlt} /></button>
        </div>
    ); 
};

export default ReviewItem;