import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData();

  // const itemsPerPage = 10; //TODO: make it dynamically
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  /*  // Create an array of page numbers based on the total number of pages
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  } */

  //Alternatively, we could
  const pageNumbers = [...Array(totalPages).keys()];

  /* 
Done: 1. Determine the total number of items
TODO: 2. Define the number of items to display per page
Done: 3. Calculate the number of pages 
Done: 4. Determine which page the user is on 
*/

  /*  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []); */

  useEffect(() => {
    async function fetchData() {
      // Load the data for the current page from the API
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  useEffect(() => {
    //console.log( 'Products', products);
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    fetch(`http://localhost:5000/productsByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const saveCart = [];
        //console.log(storedCart);

        //step-01: get id of added product
        for (const id in storedCart) {
          //console.log(id);

          //step-02: get product from products state by using id
          const addedProduct = cartProducts.find((product) => product._id === id);
          //console.log(addedProduct);

        if (addedProduct) {
        //step-03: quantity of the products
          const quantity = storedCart[id];
          addedProduct.quantity = quantity;

          //step-04: add the added product to the saved cart
          saveCart.push(addedProduct);
        }
        //console.log(addedProduct);
        }
      //step-05. save the cart
      setCart(saveCart);
    });

  }, []);

  const handleAddToCart = (product) => {
    //cart.push(product);

    let newCart = [];
    //(advance)if product dose not exist in the cart then set quantity = 1;  if exist update quantity by 1.
    const exist = cart.find((pd) => pd._id === product._id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exist];
    }

    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 15, 20];
  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  return (
    <>
      <div className="shop__container">
        <div className="products__container">
          {/* <h2>Products coming here: {products.length}</h2> */}
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart__container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to="/orders">
              <button className="btn__proceed">
                Review Order
                <FontAwesomeIcon className="right__arrow" icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* pagination */}
      <div className="pagination">
        <p>
          currentPage: {currentPage} and items per page: {itemsPerPage}
        </p>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
