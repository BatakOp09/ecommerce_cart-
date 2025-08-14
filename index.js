document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "mobile cover", price: 29.99 },
        { id: 2, name: "earbuds", price: 49.99 },
        { id: 3, name: "watch", price: 59.999 },
    
    ];

    const cart = JSON.parse(localStorage.getItem("data")) || [];

    const list = document.getElementById('product-list')
    const item = document.getElementById('cart-items')
    const emptymsg = document.getElementById('empty-cart')
    const total = document.getElementById('cart-total')
    const price = document.getElementById('total-price')
    const checkout = document.getElementById('checkout-btn')

    products.forEach(p => {
        const productDiv = document.createElement('div');
        productDiv.classList.add("product")
        productDiv.innerHTML = `
        <span>${p.name}  -  price: $${p.price.toFixed(2)}</span>
        <button data-id="${p.id}">Add to Cart</button>
        `;
        list.appendChild(productDiv)
        
    });
    renderCart();

    list.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"))
            const pro = products.find((p) => p.id === productId)
            addtoCart(pro)
            saveData();
        }
    })

    function addtoCart(product){
        cart.push(product)
        renderCart()
        saveData();
    }


    function renderCart() {
        item.innerText = "";
        let totalprice = 0;
        
        if (cart.length > 0) {
            emptymsg.classList.remove("hidden")
            total.classList.remove("hidden")
            cart.forEach((pro, index) => {
                totalprice += pro.price;
                 const cartItem = document.createElement('div')
                cartItem.innerHTML = `
                ${pro.name} - $${pro.price.toFixed(2)}
                <button data-id="${pro.id}" class="remove">remove</button>
                `;
                item.appendChild(cartItem)
                price.innerText = `${totalprice.toFixed(2)}`
                saveData();
                
               const del = cartItem.querySelector(".remove")
                del.addEventListener("click", (e) => {
                  const cartId = parseInt(e.target.getAttribute("data-id"));
                  const index = cart.findIndex((p) => p.id === cartId);
                  if (index !== -1) {
                    cart.splice(index, 1);
                  }
                    renderCart();
                    saveData();
                });
            });
            
        } else {
            total.classList.add("hidden")
            emptymsg.classList.remove("hidden")
            price.textContent = "$0.00"
            saveData();
        }
    }

    


    checkout.addEventListener('click', () => {
        cart.length = 0;
        alert("check out successful");
        renderCart();
    });

    function saveData() {
        localStorage.setItem("data", JSON.stringify(cart))
    }

})
