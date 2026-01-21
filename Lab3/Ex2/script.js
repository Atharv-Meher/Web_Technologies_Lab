/* ---------- Cart Data ---------- */

let cart = [
    { name: "Laptop", price: 60000, quantity: 1, category: "electronics" },
    { name: "Headphones", price: 2000, quantity: 2, category: "electronics" },
    { name: "Book", price: 500, quantity: 3, category: "education" }
];

/* ---------- Cart Operations ---------- */

function updateQuantity(name, qty) {
    const item = cart.find(p => p.name === name);
    if (item && qty > 0) {
        item.quantity = Number(qty);
    }
    renderCart();
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
}

/* ---------- Discount Rules ---------- */

function calculateItemDiscount(item) {
    let discount = 0;

    // Bulk discount
    if (item.quantity >= 5) discount += 0.10;

    // Category discount
    if (item.category === "electronics") discount += 0.15;
    if (item.category === "education") discount += 0.05;

    // Time-based discount (8 PM – 11 PM)
    const hour = new Date().getHours();
    if (hour >= 20 && hour <= 23) discount += 0.05;

    return discount;
}

/* ---------- Coupon Logic ---------- */

function applyCoupon(code, total) {
    const coupon = code.trim().toUpperCase();

    if (coupon === "SAVE10") return total * 0.90;
    if (coupon === "WELCOME5") return total * 0.95;
    if (coupon === "FLAT500" && total >= 2000) return total - 500;

    return total;
}

/* ---------- Total Calculation ---------- */

function calculateTotal() {
    let subtotal = 0;

    cart.forEach(item => {
        const base = item.price * item.quantity;
        const discount = calculateItemDiscount(item);
        subtotal += base * (1 - discount);
    });

    const couponCode = document.getElementById("coupon").value;
    return applyCoupon(couponCode, subtotal);
}

/* ---------- DOM Rendering ---------- */

function renderCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "item";

        row.innerHTML = `
            <span>${item.name} (₹${item.price})</span>
            <input type="number" min="1" value="${item.quantity}"
                onchange="updateQuantity('${item.name}', this.value)">
            <button onclick="removeItem('${item.name}')">Remove</button>
        `;

        cartDiv.appendChild(row);
    });

    document.getElementById("total").textContent =
        "Total: ₹" + calculateTotal().toFixed(2);
}

/* ---------- Live Updates ---------- */

document.getElementById("coupon").addEventListener("input", renderCart);

/* ---------- Initial Render ---------- */
renderCart();
