import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([])

  useEffect(() => {
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    console.log(storedCart);
  } , [])

  const handleAddToCart = (product) =>{
    //cart.push(product);
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id)
}

  return (
    <div className="shop__container">
      <div className="products__container">
        {/* <h2>Products coming here: {products.length}</h2> */}
        {products.map((product) => (
          <Product 
            key={product.id} 
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart__container">
        <Cart cart={cart}/>
      </div>
    </div>
  );
};

export default Shop;
