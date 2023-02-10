import React from "react";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, getStorage, listAll } from "firebase/storage";
import '../styles/Products.css';
import { FaShoppingCart } from "react-icons/fa";

const products = [
  { id: 1, name: "Product 1", price: 9.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  { id: 3, name: "Product 3", price: 29.99 },
];

function Products() {
  const [imageUrls, setImageUrls] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const storage = getStorage();
  const imagesListRef = ref(storage, "images/Products/");

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const total = cart.reduce((acc, product) => acc + product.price, 0);

  return(
    <div>
      <h1>Products</h1>
      <br></br>
      <br></br>
      <div id="Product-Images">
        {imageUrls && imageUrls.map((url, index) => {
          return (
            <div key={url} onClick={() => addToCart(products[index])}>
              <img id="product-imgs" src={url} alt="" />
              <br />
              <br />
              {products[index].name} - ${products[index].price}
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <FaShoppingCart onClick={toggleCart} />
      {showCart && (
        <div id="shopping-cart">
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
              </li>
            ))}
            <li>
              Total: ${total.toFixed(2)}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Products;

