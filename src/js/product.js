import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// ensure cart is always an array
function addProductToCart(product) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Ensure price is a number
  const price = parseFloat(product.FinalPrice || product.ListPrice || 0);

  // Check if the product is already in the cart
  const existingItem = cart.find(item => item.Id === product.Id);

  if (existingItem) {
    // If it exists, increment the quantity
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // If it's new, add it with quantity 1
    product.quantity = 1;
    product.FinalPrice = price; // store parsed price
    cart.push(product);
  }

  localStorage.setItem("so-cart", JSON.stringify(cart));
}


// Add to cart button event handler
async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  if (!productId) return;

  const product = await dataSource.findProductById(productId);
  addProductToCart(product);
}

// Attach event listener if button exists
const addButton = document.getElementById("addToCart");
if (addButton) {
  addButton.addEventListener("click", addToCartHandler);
}
