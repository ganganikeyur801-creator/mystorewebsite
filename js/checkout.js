function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderCheckout() {
    const cart = getCart();
    const container = document.getElementById("checkoutItems");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty!</p>";
        document.getElementById("checkoutTotal").innerText = 0;
        return;
    }

    let total = 0;
    let qtyMap = {};
    cart.forEach(id => { qtyMap[id] = (qtyMap[id] || 0) + 1; });

    Object.keys(qtyMap).forEach(id => {
        const product = products.find(p => p.id == id);
        const quantity = qtyMap[id];
        total += product.price * quantity;

        container.innerHTML += `
        <div class="d-flex justify-content-between mb-2">
            <span>${product.name} x ${quantity}</span>
            <span>₹ ${product.price * quantity}</span>
        </div>
        `;
    });

    document.getElementById("checkoutTotal").innerText = total;
}

// Handle form submit
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const address = document.getElementById("userAddress").value;
    const payment = document.getElementById("paymentMethod").value;

    // Simple demo alert
    alert(`Thank you ${name}! Your order has been placed.\nPayment: ${payment}\nTotal: ₹${document.getElementById("checkoutTotal").innerText}`);

    // Clear cart after order
    localStorage.removeItem("cart");
    renderCheckout();

    // Optionally redirect to home
    window.location.href = "index.html";
});

// Initial render
renderCheckout();
