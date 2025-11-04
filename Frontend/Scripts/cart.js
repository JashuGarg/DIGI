// Select DOM elements
const cartBtn = document.getElementById("cartBtn");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const cartDropdown = document.getElementById("cartDropdown");

// Function to fetch and render cart items
async function fetchCartItems() {
  try {
    const res = await fetch("/item/cartitems");
    const data = await res.json();
    const orders = data.orders;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    orders.forEach(({ item, quantity }) => {
      if (!item) return;

      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      itemElement.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.imageUrl}" alt="${item.itemname}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.itemname}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString("en-IN")}</div>
          <div class="cart-item-quantity">
            <button class="qty-btn" data-id="${item._id}" data-action="decrease">-</button>
            <span class="qty-value">${quantity}</span>
            <button class="qty-btn" data-id="${item._id}" data-action="increase">+</button>
          </div>
        </div>
        <button class="remove-btn" data-id="${item._id}">
        <i class="ri-close-line"></i>
        </button>
      `;

      cartItemsContainer.appendChild(itemElement);
      total += item.price * quantity;
    });

    cartTotalElement.textContent = `₹${total.toLocaleString("en-IN")}`;
  } catch (err) {
    console.error("Error fetching cart items:", err);
  }
}

cartBtn.addEventListener("click", async () => {
  cartDropdown.classList.toggle("active");
  await fetchCartItems();
});

cartItemsContainer.addEventListener("click", async (e) => {
  const btn = e.target.closest(".qty-btn");
  if (!btn) return;

  const productId = btn.dataset.id;
  const action = btn.dataset.action;

  try {
    const res = await fetch("/admin/updateitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, action }),
    });

    const data = await res.json();

    if (data.success) {
      await fetchCartItems(); 
    } else {
      console.error("Failed to update cart:", data.message);
    }
  } catch (err) {
    console.error("Error updating cart:", err);
  }
});
cartItemsContainer.addEventListener("click", async (e) => {
  const removeBtn = e.target.closest(".remove-btn");
  if (!removeBtn) return;

  const productId = removeBtn.dataset.id;

  try {
    const res = await fetch("/admin/deleteitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId })
    });

    const data = await res.json();
    if (data.success) {
      console.log("Item removed:", productId);
      await fetchCartItems();
    } else {
      console.error("Failed to remove item:", data.message);
    }
  } catch (err) {
    console.error("Error removing item:", err);
  }
});


  function goToCheckout() {
    window.location.href = "Thanks.html";  // or "thankyou.html"
  }