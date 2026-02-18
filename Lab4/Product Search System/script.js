const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const statusDiv = document.getElementById("status");

let debounceTimer;


// Debounce function
function debounce(callback, delay) {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(callback, delay);
}


// Search function
async function searchProducts(query) {

    if (query.length === 0) {

        resultsDiv.innerHTML = "";
        statusDiv.innerHTML = "";
        return;
    }

    statusDiv.innerHTML = "Searching...";
    statusDiv.className = "loading";

    try {

        const response = await fetch("products.json");

        if (!response.ok)
            throw new Error("Network error");

        const data = await response.json();

        const filtered = data.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        displayResults(filtered);

    } catch (error) {

        statusDiv.innerHTML = "Failed to fetch products";
        statusDiv.className = "error";

        resultsDiv.innerHTML = "";
    }
}


// Display results
function displayResults(products) {

    resultsDiv.innerHTML = "";

    if (products.length === 0) {

        statusDiv.innerHTML = "No results found";
        statusDiv.className = "no-results";
        return;
    }

    statusDiv.innerHTML = "";

    products.forEach(product => {

        const div = document.createElement("div");

        div.className = "product";

        div.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-price">₹${product.price}</div>
            <div class="product-category">${product.category}</div>
        `;

        resultsDiv.appendChild(div);

    });
}


// Input event with debouncing
searchInput.addEventListener("input", () => {

    const query = searchInput.value.trim();

    debounce(() => {

        searchProducts(query);

    }, 500);

});
