let cart = [];

function addToCart(product, price) {
  const existing = cart.find(item => item.name === product);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: product, price: price, qty: 1 });
  }
  alert(`${product} added to cart!`);
}

function openCart() {
  const modal = document.getElementById('cart-modal');
  const items = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');

  items.innerHTML = '';
  let cartTotal = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} x ${item.qty} - $${(item.price * item.qty).toFixed(2)} 
      <button onclick="removeFromCart(${index})">Remove</button>`;
    items.appendChild(li);
    cartTotal += item.price * item.qty;
  });

  total.textContent = cartTotal.toFixed(2);
  modal.style.display = 'block';
}

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

function removeFromCart(index) {
  cart.splice(index, 1);
  openCart();
}

function checkout() {
  fetch('https://ecorooted-backend.onrender.com/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart })
  })
  .then(res => res.json())
  .then(data => {
    if (data.url) {
      window.location.href = data.url;
    }
  })
  .catch(err => console.error(err));
}
