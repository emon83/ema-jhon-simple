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
    console.log( 'Products', products);
    const storedCart = getShoppingCart();
    const saveCart = [];
    //console.log(storedCart);

    //step-01: get id of added product
    for (const id in storedCart) {
      //console.log(id);

      //step-02: get product from products state by using id
      const addedProduct = products.find(product => product.id === id);
      //console.log(addedProduct);

      if (addedProduct) {
        //step-03: quantity of the products
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;

        //step-04: add the added product to the saved cart
        saveCart.push(addedProduct);
      }
      console.log(addedProduct);

    }
    //step-05. save the cart
    setCart(saveCart);
  } , [products]);

  const handleAddToCart = (product) =>{
    //cart.push(product);

    let newCart = [];
    //(advance)if product dose not exist in the cart then set quantity = 1;  if exist update quantity by 1.  
     const exist = cart.find(pd => pd.id === product.id);
    if (!exist) {
      product.quantity = 1;
       newCart = [...cart, product];
    }else{
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter(pd => pd.id !== product.id);
      newCart = [...remaining, exist];
    }

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
