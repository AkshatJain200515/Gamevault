async function fetchProducts(keyword = '', category = '') {
    const list = document.getElementById('product-list');
    list.innerHTML = `
        <div class="spinner"></div>
        <p style="color: #888; font-family: monospace;">Scanning Vault...</p>
    `;

    try {
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (category) params.append('category', category);
        
        params.append('_t', Date.now());

        const url = `/api/products?${params.toString()}`;
        const response = await fetch(url);
        const products = await response.json();

        displayProducts(products);
    } catch (error) {
        console.error("Vault Connection Failure:", error);
        list.innerHTML = "<p class='error-msg'>Interface Error: Check backend connectivity.</p>";
    }
}


function displayProducts(products) {
    const list = document.getElementById('product-list');
    list.innerHTML = ""; 

    products.forEach(product => {
        const cat = (product.category || "").toLowerCase().trim();
        let finalImage = product.image;

        if (!finalImage || finalImage.trim() === "" || finalImage === "null") {
            const placeholders = {
                mouse: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=500',
                keyboard: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500',
                cpu: 'https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?q=80&w=500',
                gpu: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=500',
                default: 'https://images.unsplash.com/photo-1550745165-9bc0b252728f?q=80&w=500'
            };

            finalImage = placeholders[cat] || (cat.includes('graphic') ? placeholders.gpu : placeholders.default);
        }

        
        const isOutOfStock = product.countInStock <= 0;
        const stockStatus = isOutOfStock 
            ? `<span class="sold-out">Sold Out</span>`
            : `<span class="in-stock">Stock: ${product.countInStock}</span>`;

        const card = document.createElement('div');
        card.className = `product-card ${isOutOfStock ? 'card-disabled' : ''}`;

        card.innerHTML = `
            <div class="card-image">
                <img src="${finalImage}" alt="${product.name}" 
                     onerror="this.src='${'https://images.unsplash.com/photo-1550745165-9bc0b252728f?q=80&w=500'}'">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <span class="category-badge">${product.category}</span>
                    <span class="stock-info">${stockStatus}</span>
                </div>
                <h3>${product.name}</h3>
                <div class="card-footer">
                    <p class="price">${product.price}€</p>
                    <button class="buy-btn" 
                        onclick="${isOutOfStock ? '' : `goToCheckout('${product._id}', ${product.price})`}" 
                        ${isOutOfStock ? 'disabled' : ''}>
                        ${isOutOfStock ? 'Restocking' : 'Buy Now'}
                    </button>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}


function filterByCategory(categoryName) {
    document.getElementById('search-input').value = '';
    fetchProducts('', categoryName); 
}

document.getElementById('search-btn').addEventListener('click', () => {
    fetchProducts(document.getElementById('search-input').value);
});

function goToCheckout(id, price) {
    
    window.location.href = `checkout.html?id=${id}&price=${price}`;
}


fetchProducts();