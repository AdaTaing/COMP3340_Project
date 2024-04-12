let cart_items = [];
let total_cart_price = 0;
let cart_num = 0;

document.addEventListener("DOMContentLoaded", function() {
    
    const shoppingCart = document.getElementById("shopping-cart");
    shoppingCart.addEventListener("click", function() {
        // Get the modal element
        const modal = document.getElementById("modal");

        // Display the modal by changing its style
        modal.style.display = "block";

        // Close the modal when the close button is clicked
        const closeButton = document.getElementById("close-button");
        closeButton.addEventListener("click", function() {
            modal.style.display = "none";
        });

        // Close the modal when clicking outside of it
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
    
    
    const item_container = document.getElementById("items-container");
    fetch('./scripts/items.json')
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            data.items.forEach(function(item) {
                let newItem = document.createElement("div");
                newItem.setAttribute("id", "item");
                let image  = document.createElement("img");
                image.src = item.src;
                image.id = 'item-image';
                newItem.appendChild(image);

                newItem.innerHTML += 
                "<h3>" + item.name + "</h3>"
                +"<p>$" + item.price + "</p>";
                
                let addToCartButton = document.createElement("button");
                addToCartButton.innerHTML= "Add to Cart";
                addToCartButton.id = "add-to-cart";
                addToCartButton.name = "item";
                addToCartButton.setAttribute("data-id", item.id);
                addToCartButton.onclick = function () {
                    let item_ID = parseInt(this.getAttribute("data-id"));
                    let selected_item = data.items.find(item => item.id == item_ID);
                    cart_items.push(selected_item);
                    
                    total_cart_price +=  selected_item.price;
                    cart_num += 1;
                    let num = document.getElementById("cart-item-number");
                    num.innerHTML = cart_num;
                    num.style.display='inline-block';
                };
                
                newItem.appendChild(addToCartButton);

                item_container.appendChild(newItem);
                updateCartDisplay();
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
            
}
);


function updateCartDisplay() {
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = ""; // Clear the existing content

    if (cart_items.length === 0) {
        modalContent.innerHTML = "<p>Your shopping cart is empty.</p>";
    } else {

        const itemCounts = {};
        cart_items.forEach(function(item) {
            if (item.id in itemCounts) {
                itemCounts[item.id]++;
            } else {
                itemCounts[item.id] = 1;
            }});

        Objects.keys(itemCounts).forEach(function(item) {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.innerHTML = `<img src="${item.src}" alt="${item.name}" class="cart-item-image">
                                 <span class="cart-item-name">${item.name}</span>
                                 <span class="cart-item-count">${itemCount}</span>
                                 <span class="cart-item-price">$${(item.price*itemCount).toFixed(2)}</span>`;
            modalContent.appendChild(itemDiv);
        });

        // Display total price
        const totalPriceDiv = document.createElement("div");
        totalPriceDiv.classList.add("cart-total-price");
        totalPriceDiv.textContent = `Total: $${total_cart_price.toFixed(2)}`;
        modalContent.appendChild(totalPriceDiv);
    }
}