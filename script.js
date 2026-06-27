// ==================== 1. TO-DO LIST LOGIC ====================
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

// Local Storage se data nikalna (agar pehle se kuch saved ho toh)
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function showTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(${index})" style="background:red; padding:2px 6px;">X</button>
        `;
        todoList.appendChild(li);
    });
    // Local Storage me save karna
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

addTodoBtn.addEventListener('click', () => {
    if (todoInput.value.trim() !== '') {
        tasks.push(todoInput.value.trim());
        todoInput.value = '';
        showTasks();
    }
});

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    showTasks();
};

showTasks(); // Page khulte hi tasks dikhao


// ==================== 2. PRODUCT FILTER LOGIC ====================
const products = [
    { name: 'Phone', category: 'tech', price: 500 },
    { name: 'Laptop', category: 'tech', price: 1000 },
    { name: 'T-Shirt', category: 'apparel', price: 20 },
    { name: 'Jeans', category: 'apparel', price: 40 }
];

const categoryFilter = document.getElementById('categoryFilter');
const sortCriteria = document.getElementById('sortCriteria');
const productContainer = document.getElementById('productContainer');

function showProducts() {
    let currentProducts = [...products];

    // Filter karega
    const cat = categoryFilter.value;
    if (cat !== 'all') {
        currentProducts = currentProducts.filter(p => p.category === cat);
    }

    // Sort karega
    const sort = sortCriteria.value;
    if (sort === 'low-high') {
        currentProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'high-low') {
        currentProducts.sort((a, b) => b.price - a.price);
    }

    // HTML me dikhayega
    productContainer.innerHTML = '';
    currentProducts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `<span>${p.name} (${p.category})</span> <b>$${p.price}</b>`;
        productContainer.appendChild(div);
    });
}

categoryFilter.addEventListener('change', showProducts);
sortCriteria.addEventListener('change', showProducts);

showProducts(); // Page khulte hi items dikhao