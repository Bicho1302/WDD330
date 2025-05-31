import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");


  // ensure cart is always an array
  function addProductToCart(product) {
  // Get current cart from LS (or start with empty array)
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Add the new product to the cart
  cart.push(product);

  // Save updated cart back to localStorage
  localStorage.setItem("so-cart", JSON.stringify(cart));
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
