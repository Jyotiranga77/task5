const cartItemsDiv = document.getElementById("cart-items");
const totalCount = document.getElementById("total-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartItemsDiv.innerHTML = "";
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalCount.textContent = 0;
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "d-flex justify-content-between border-bottom py-2";
    div.innerHTML = `
      <span>${item}</span>
      <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  totalCount.textContent = cart.length;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  alert("Thank you! Your order has been placed.");
  localStorage.removeItem("cart");
  cart = [];
  displayCart();
}

displayCart();
