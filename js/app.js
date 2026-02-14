let currentCategory = "all";

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
function goToCart() {
    window.location.href = "cart.html"; // Replace with your cart page URL
}

// Update cart count in navbar
function updateCartCount() {
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.innerText = getCart().length;
    }
}

// Add product to cart
function addToCart(id) {
    let cart = getCart();
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Set active category
function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll(".category-bar button").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".category-bar button").forEach(btn => {
        if (btn.innerText.toLowerCase() === cat || (cat === "all" && btn.innerText.toLowerCase() === "all")) btn.classList.add("active");
    });
    renderProducts();
}

// View product page
function viewProduct(id) {
    window.location.href = "product.html?id=" + id;
}

// Render products on home page
function renderProducts() {
    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let filtered = products.filter(p => (p.name.toLowerCase().includes(searchText)) && (currentCategory === "all" || p.category === currentCategory));

    let container = document.getElementById("productContainer");
    container.innerHTML = "";

    filtered.forEach((product, index) => {
        let col = document.createElement("div");
        col.className = "col-md-3 mb-4";
        col.style.animation = `fadeInUp 0.6s ease forwards`;
        col.style.animationDelay = `${index * 0.1}s`;

        col.innerHTML = `
            <div class="card product-card p-3">
                <img src="${product.image}" class="img-fluid mb-3" alt="${product.name}">
                <h5>${product.name}</h5>
                <p>₹ ${product.price}</p>
                <button class="btn btn-outline-dark mb-2" onclick="viewProduct(${product.id})">View</button>
                <button class="btn btn-dark" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(col);

        // Trigger animation
        setTimeout(() => { col.querySelector(".product-card").style.opacity = 1; }, index * 100);
    });
}

// Initial render
renderProducts();
updateCartCount();
