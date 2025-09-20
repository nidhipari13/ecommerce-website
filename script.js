// ===============================
// Product Data
// ===============================
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 500,
        image: "https://images.pexels.com/photos/7241360/pexels-photo-7241360.jpeg",
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 1000,
        image: "https://images.pexels.com/photos/11031463/pexels-photo-11031463.png",
    },
    {
        id: 3,
        name: "Premium Cotton T-Shirt",
        category: "clothing",
        price: 300,
        image: "https://images.pexels.com/photos/9558567/pexels-photo-9558567.jpeg",

    },
    {
        id: 4,
        name: "Running Sneakers",
        category: "clothing",
        price: 1500,
        image: "https://images.pexels.com/photos/7432/pexels-photo.jpg",
   
    },
    {
        id: 5,
        name: "Yoga Mat Pro",
        category: "sports",
        price: 399,
        image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
    
    },
    {
        id: 6,
        name: "Resistance Bands Set",
        category: "sports",
        price: 700,
        image: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg",

    },
    {
        id: 7,
        name: "Smart Home Speaker",
        category: "electronics",
        price: 900,
        image: "https://images.pexels.com/photos/6857782/pexels-photo-6857782.jpeg",

    },
    {
        id: 8,
        name: "Ceramic Plant Pot",
        category: "home",
        price: 600,
        image: "https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg",

    },
    {
        id: 9,
        name: "LED Desk Lamp",
        category: "home",
        price: 400,
        image: "https://images.pexels.com/photos/33905430/pexels-photo-33905430.jpeg",
   
    },
    {
        id: 10,
        name: "Wireless Gaming Mouse",
        category: "electronics",
        price: 999,
        image: "https://images.pexels.com/photos/29259392/pexels-photo-29259392.jpeg",
 
    },
    {
        id: 11,
        name: "Denim Jacket",
        category: "clothing",
        price: 3000,
        image: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg",
 
    },
    {
        id: 12,
        name: "Protein Shaker Bottle",
        category: "sports",
        price: 499,
        image: "https://images.pexels.com/photos/6551132/pexels-photo-6551132.jpeg",

    },
    {
        id: 13,
        name: "Aromatherapy Diffuser",
        category: "home",
        price: 299,
        image: "https://images.pexels.com/photos/19201670/pexels-photo-19201670.jpeg",
    },
    {
        id: 14,
        name: "Wireless Earbuds",
        category: "electronics",
        price: 3999,
        image: "https://images.pexels.com/photos/3250815/pexels-photo-3250815.jpeg",
    },
    {
        id: 15,
        name: "Summer Dress",
        category: "clothing",
        price: 899,
        image: "https://images.pexels.com/photos/33954540/pexels-photo-33954540.jpeg",
    },
    {
        id: 16,
        name: "Dumbbells Set",
        category: "sports",
        price: 1999,
        image: "https://images.pexels.com/photos/39671/physiotherapy-weight-training-dumbbell-exercise-balls-39671.jpeg",
    }
];

// Shopping Cart 
let cart = [];
let filteredProducts = [...products];


// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    updateCartUI();
    setupEventListeners();
    setupCategoryCards();
});

// Event Listeners
function setupEventListeners() {
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', sortProducts);

    searchBtn.addEventListener('click', searchProducts);
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });

    checkoutBtn.addEventListener('click', handleCheckout);
}

// Category Cards
function setupCategoryCards() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function () {
            const category = this.dataset.category;
            categoryFilter.value = category;
            filterProducts();
            scrollToProducts();
        });
    });
}

// Render Products

function renderProducts() {
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}" 
                     style="width:100%; height:200px; object-fit:cover; border-radius:10px;" />
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">Rs.${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Cart Functions

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showSuccessMessage('Product added to cart!');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showSuccessMessage('Product removed from cart!');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover;" />
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : 'auto';
}

// Filters 

function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    sortProducts();
}

function sortProducts() {
    const sortBy = sortFilter.value;
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    renderProducts();
}

function searchProducts() {
    filterProducts();
}


// Checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const confirmed = confirm(`Proceed to checkout?\n\nItems: ${itemCount}\nTotal: $${total.toFixed(2)}`);
    if (confirmed) {
        showSuccessMessage('Order placed successfully! Thank you for your purchase.');
        cart = [];
        updateCartUI();
        toggleCart();
    }
}


// UI Helpers
function showSuccessMessage(message) {
    document.querySelectorAll('.success-message').forEach(msg => msg.remove());

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;

    const header = document.querySelector('.header');
    header.insertAdjacentElement('afterend', successDiv);

    setTimeout(() => successDiv.remove(), 3000);
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
}


window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
