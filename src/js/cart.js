import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Show total footer
  document.querySelector(".cart-footer").classList.remove("hide");

 const total = cartItems.reduce((sum, item) => {
  const price = parseFloat(item.FinalPrice || 0);
  const quantity = item.quantity || 1;
  return sum + (isNaN(price) ? 0 : price * quantity);
}, 0);


  document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;
  
  
}


function cartItemTemplate(item) {
  const imagePath = item.Image.startsWith("..")
    ? item.Image.replace("../", "/")
    : item.Image;

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${imagePath}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0]?.ColorName || "N/A"}</p>
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}



document.getElementById("clearCart")?.addEventListener("click", () => {
  localStorage.removeItem("so-cart");
  location.reload();
});

renderCartContents();
