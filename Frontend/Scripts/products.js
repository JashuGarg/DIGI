addEventListener("load", () => {
  const productsContainer = document.querySelector(".products");
  const sortSelect = document.getElementById("sort");

 
  const route = document.body.dataset.route; 
  let allProducts = [];

  if (!route) {
    console.error("No data-route found in <body>");
    return;
  }

  fetch(`/item/${route}`)
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts(allProducts);
    })
    .catch(err => console.error("Error fetching items:", err));

  function renderProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.setAttribute("data-id", item._id);

      card.innerHTML = `
        <img src="${item.imageUrl || './public/default.webp'}" alt="${item.name}">
        <div class="product-name">${item.itemname}</div>
        <div class="product-name">${item.description}</div>
        <div class="product-price">₹${item.price}</div>
        <button class="cart-btn">Add to Cart</button>
      `;
      productsContainer.appendChild(card);
    });
  }

  sortSelect?.addEventListener("change", () => {
    let sorted = [...allProducts];
    const sortType = sortSelect.value;

    if (sortType === "lowtohigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "hightolow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortType === "newarrivals") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      sorted = [...allProducts];
    }

    renderProducts(sorted);
  });

  productsContainer.addEventListener("click", async (e) => {
    const button = e.target.closest(".cart-btn");
    if (!button) return;

    const productCard = button.closest(".product-card");
    const productId = productCard.getAttribute("data-id");

    try {
      const res = await fetch("/users/addtocart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      });

      const data = await res.json();
      console.log("Response from /users/addtocart:", data);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  });
});
