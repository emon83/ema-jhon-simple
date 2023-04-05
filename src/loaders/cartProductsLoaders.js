import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoaders = async() => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    //if cart data is in database, you have to use async await
    const storedCart = getShoppingCart();
    console.log(storedCart);

    const saveCart = [];
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd.id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct);
        }
    }
    //if you need to return two things
    //return [products, saveCart];

    //another way to
    //return {products, cart: saveCart};
    
    //console.log(products);
    return saveCart;
}

export default cartProductsLoaders;