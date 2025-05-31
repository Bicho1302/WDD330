import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// ensure cart is always an array
function addProductToCart(product) {
  // Get current cart from localStorage or start with empty array
  let cart = getLocalStorage("so-cart") || [];

  // Ensure FinalPrice is a number
  product.FinalPrice = parseFloat(product.FinalPrice || product.ListPrice || 0);

  // Add product to cart
  cart.push(product);

  // Save updated cart to localStorage
  setLocalStorage("so-cart", cart);
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
