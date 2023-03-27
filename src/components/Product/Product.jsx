import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css";

const Product = (props) => {
  const { img, name, seller, quantity, price, ratings } = props.product;

  const handleAddToCart = props.handleAddToCart;

  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="product__info">
        <h6 className="product__name">{name}</h6>
        <p style={{fontSize: '18px'}}>Price: ${price}</p>
        <p style={{fontSize: '14px'}}>Manufacturer: {seller}</p>
        <p style={{fontSize: '14px'}}>Rating: {ratings} Star</p>
      </div>
      <button onClick={ () => handleAddToCart(props.product)} className="btn__cart">
        Add to Cart
        <FontAwesomeIcon icon={faShoppingCart} />
        </button>
    </div>
  );
};

export default Product;
