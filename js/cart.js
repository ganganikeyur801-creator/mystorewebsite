function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("total").innerText = 0;
        return;
    }

    let total = 0;

    // Count quantity per product
    let qtyMap = {};
    cart.forEach(id => { qtyMap[id] = (qtyMap[id] || 0) + 1; });

    Object.keys(qtyMap).forEach(id => {
        const product = products.find(p => p.id == id);
        const quantity = qtyMap[id];
        total += product.price * quantity;

        container.innerHTML += `
        <div class="card p-3 d-flex flex-row justify-content-between align-items-center">
            <div>
                <strong>${product.name}</strong>
                <p>₹ ${product.price} x 
                <input type="number" class="quantity-input" min="1" value="${quantity}" onchange="updateQuantity(${id}, this.value)"> = ₹ ${product.price * quantity}</p>
            </div>
            <button class="btn btn-sm btn-danger btn-remove" onclick="removeItem(${id})">Remove</button>
        </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

function updateQuantity(id, value) {
    value = parseInt(value);
    if (value < 1) value = 1;

    let cart = getCart();
    cart = cart.filter(item => item != id); // remove all instances
    for (let i = 0; i < value; i++) { cart.push(id); } // add new quantity
    saveCart(cart);
    renderCart();
}

function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(item => item != id); // remove all instances
    saveCart(cart);
    renderCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}

// NEW: go to checkout page
function goToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html"; // replace with your checkout page
}

// Initial render
renderCart();
