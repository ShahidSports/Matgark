let cartItems = []; // Array to hold items in the cart
let totalPrice = 0; // Variable to keep track of total price
let orders = {}; // Object to store orders with reference numbers as keys

function addToCart(itemName, itemPrice) {
    // Add the item to the cart array
    cartItems.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice; // Update total price

    // Update the cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = ''; // Clear the current cart items

    // Add each item in the cart to the list
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - SAR${item.price}`;
        cartItemsList.appendChild(listItem);
    });

    // Update the total price displayed
    document.getElementById('totalPrice').textContent = totalPrice;
}

// Function to generate a unique reference number
function generateReferenceNumber() {
    return 'REF-' + Math.floor(Math.random() * 1000000); // Generates a random reference number
}

// Handle submission of the order
document.getElementById('submit-button').addEventListener('click', function() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!'); // Alert if the cart is empty
        return;
    }

    const referenceNumber = generateReferenceNumber(); // Generate the reference number
    orders[referenceNumber] = cartItems.slice(); // Store the current cart items with the reference number
    const referenceNumberDisplay = document.getElementById('reference-number');
    referenceNumberDisplay.textContent = `Your reference number is: ${referenceNumber}`;
    referenceNumberDisplay.style.display = 'block'; // Show the reference number

    // Clear the cart after submission
    cartItems = [];
    totalPrice = 0;
    updateCartDisplay(); // Update cart display after clearing
});

// Handle order tracking
document.getElementById('track-order-button').addEventListener('click', function() {
    const referenceInput = document.getElementById('reference-input').value;
    const orderDetailsDisplay = document.getElementById('order-details');

    if (orders[referenceInput]) {
        const orderDetails = orders[referenceInput].map(item => `${item.name} - SAR${item.price}`).join(', ');
        orderDetailsDisplay.textContent = `Order Details: ${orderDetails}`;
        orderDetailsDisplay.style.display = 'block';
    } else {
        orderDetailsDisplay.textContent = 'Order not found. Please check your reference number.';
        orderDetailsDisplay.style.display = 'block';
    }
});
