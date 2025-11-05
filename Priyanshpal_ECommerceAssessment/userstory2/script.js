// Mock product data structure for reference
// { id: 1, name: "Laptop Pro", category: "Electronics", price: 1200.00, stock: 15, description: "..." }

const productListElement = document.getElementById('product-list');
const loadingMessageElement = document.getElementById('loading-message');
const errorMessageElement = document.getElementById('error-message');
const categoryFilterElement = document.getElementById('categoryFilter');
const priceSortElement = document.getElementById('priceSort');

let allProducts = [];

// Function to fetch data from the mock API (products.json)
async function fetchProducts() {
    loadingMessageElement.style.display = 'block';
    errorMessageElement.classList.add('d-none');
    productListElement.innerHTML = '';

    try {
        // Fetch from the local mock JSON file
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allProducts = await response.json();
        populateFilters(allProducts);
        renderProducts(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        // Handle API errors gracefully
        errorMessageElement.classList.remove('d-none');
    } finally {
        loadingMessageElement.style.display = 'none';
    }
}

// Function to populate the category filter dropdown
function populateFilters(products) {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilterElement.appendChild(option);
    });
}

// Function to render products to the DOM
function renderProducts(products) {
    productListElement.innerHTML = ''; // Clear previous products
    if (products.length === 0) {
        productListElement.innerHTML = '<p class="text-center w-100">No products found matching your criteria.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = `
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Category: ${product.category}</p>
                        <p class="card-text fw-bold text-success">$${product.price.toFixed(2)}</p>
                        <p class="card-text small">${product.description}</p>
                    </div>
                </div>
            </div>
        `;
        productListElement.innerHTML += productCard;
    });
}

// Function to apply filters and sorting
function applyFiltersAndSort() {
    let filteredProducts = [...allProducts];
    const selectedCategory = categoryFilterElement.value;
    const selectedSort = priceSortElement.value;

    // 1. Filtering by Category product
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
    }

    // 2. Sorting by Price of the product 
    if (selectedSort === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(filteredProducts);
}

// Event listeners for filter and sort changes
categoryFilterElement.addEventListener('change', applyFiltersAndSort);
priceSortElement.addEventListener('change', applyFiltersAndSort);

// Initial data fetch
fetchProducts();
