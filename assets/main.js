document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn-6");

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", function (e) {
      const rect = this.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      const span = this.querySelector("span");
      span.style.top = relY + "px";
      span.style.left = relX + "px";
    });

    btn.addEventListener("mouseout", function (e) {
      const rect = this.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      const span = this.querySelector("span");
      span.style.top = relY + "px";
      span.style.left = relX + "px";
    });
  });
});

function addToCart(variantId) {
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 1
    })
  })
  .then(response => response.json())
  .then(data => {
    alert('Product added to cart!');
    // Cart update করার জন্য
    window.location.reload();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}