// Show snack on html
const snacks = [
    { id: 'snack1', name: 'Onigiri', price: 130, discount: 0.1, category: 'snack' },
    { id: 'snack2', name: 'Pudding', price: 150, discount: 0, category: 'snack' },
    { id: 'snack3', name: 'Ramen', price: 300, discount: 0.2, category: 'snack' },
    { id: 'snack4', name: 'Sandwich', price: 250, discount: 0, category: 'snack' },
    { id: 'snack5', name: 'Taiyaki', price: 160, discount: 0.1, category: 'snack' },
    { id: 'snack6', name: 'Wafer', price: 120, discount: 0, category: 'snack' },
    { id: 'snack7', name: 'Bento Box', price: 500, discount: 0.2, category: 'snack' },
    { id: 'snack8', name: 'Biscuit', price: 140, discount: 0, category: 'snack' },
    { id: 'snack9', name: 'Gummy Candy', price: 110, discount: 0.05, category: 'snack' },
    { id: 'snack10', name: 'Potato Chips', price: 150, discount: 0, category: 'snack' },
    { id: 'snack11', name: 'Melonpan', price: 160, discount: 0.1, category: 'snack' },
    { id: 'snack12', name: 'Chewing Gum', price: 90, discount: 0, category: 'snack' },
    { id: 'drink1', name: 'Water Bottle', price: 100, discount: 0, category: 'drink' },
    { id: 'drink2', name: 'Soda Can', price: 130, discount: 0.05, category: 'drink' },
    { id: 'drink3', name: 'Peach Milk', price: 140, discount: 0.1, category: 'drink' },
    { id: 'drink4', name: 'Ice Cream', price: 180, discount: 0.15, category: 'drink' },
    { id: 'drink5', name: 'Cold Brew', price: 150, discount: 0, category: 'drink' },
    { id: 'drink6', name: 'Latte', price: 170, discount: 0, category: 'drink' },
    { id: 'drink7', name: 'Banana Milk', price: 140, discount: 0.05, category: 'drink' },
    { id: 'drink8', name: 'Strawberry Cream', price: 140, discount: 0, category: 'drink' },
];

const snackRack = document.getElementById("snack-rack");
const drinkRack = document.getElementById("drink-rack");
const cartList = document.getElementById("cartList");

const cart = [];

snacks.forEach(snack => {
    const item = document.createElement("button");
    item.className = "item";
    item.setAttribute("data-id", snack.id);

    let currentQty = 0;

    function updateButtonDisplay() {
        item.innerHTML = `
        <img src="assets/${snack.id}.png">
        <p>${snack.name} <span class="tag-price">¥${snack.price}</span></p>
        ${currentQty > 0 ? `<div class="qty-badge">${currentQty}</div>` : ""}
    `;

        const tagPrice = item.querySelector(".tag-price");
        tagPrice.style.backgroundColor = snack.discount > 0 ? `#EA7D70` : `#ABCDDE`;
    }

    updateButtonDisplay();

    function updateCartListDisplay() {
        cartList.innerHTML = "";

        // Render isi keranjang
        cart.forEach(list => {
            const li = document.createElement("li");
            li.className = "list d-flex";
            li.innerHTML = `
      <img class="bg-alert" src="assets/${list.id}.png" width="100vw">
      <div class="note flex-fill d-flex flex-column justify-content-evenly">
        <p class="m-0">${list.name}</p>
        <span class="m-0">
          ¥${list.price * list.qty} 
          ${list.discount > 0 ? `<span style="padding:0 0.5rem; border-radius:100vh; background-color: var(--color7);">-${list.discount * 100}%</span>` : ""}
        </span>
      </div>
      <div class="note d-flex flex-column align-content-stretch justify-content-between text-center px-3">
        <button class="plusQty px-3" data-id="${list.id}">+</button>
        <span class="m-0">${list.qty}</span>
        <button class="minQty px-3" data-id="${list.id}">-</button>
      </div>
    `;
            cartList.appendChild(li);
        });

        // Tambahkan event listener SETELAH render selesai
        cartList.querySelectorAll(".plusQty").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const item = cart.find(i => i.id === id);
                if (item) {
                    item.qty += 1;
                    updateCartListDisplay();
                    updateButtonQty(id);
                }
            });
        });

        cartList.querySelectorAll(".minQty").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const index = cart.findIndex(i => i.id === id);
                if (index !== -1) {
                    if (cart[index].qty > 1) {
                        cart[index].qty -= 1;
                    } else {
                        cart.splice(index, 1); // hapus item dari cart
                    }
                    updateCartListDisplay();
                    updateButtonQty(id);
                }
            });
        });

        updateSummary();
    }

    function updateSummary() {
        let itemtotal = 0;
        let subtotal = 0;
        let totalDiscount = 0;
        let total = 0;

        cart.forEach(item => {
            const itemSubtotal = item.price * item.qty;
            const itemDiscount = itemSubtotal * item.discount;
            itemtotal += item.qty;
            subtotal += itemSubtotal;
            totalDiscount += itemDiscount;
            total += itemSubtotal - itemDiscount;
        });

        document.getElementById("itemtotal").textContent = `${itemtotal}`;
        document.getElementById("subtotal").textContent = `¥${subtotal}`;
        document.getElementById("totalDiscount").textContent = `-¥${totalDiscount}`;
        document.getElementById("total").textContent = `¥${total}`;
    }

    function updateButtonQty(id) {
        const itemBtn = document.querySelector(`button[data-id="${id}"]`);
        const itemData = cart.find(i => i.id === id);
        if (!itemBtn) return;
        const qty = itemData ? itemData.qty : 0;

        const snack = snacks.find(s => s.id === id); // ambil datanya
        itemBtn.innerHTML = `
    <img src="assets/${id}.png">
    <p>${snack.name} <span class="tag-price">¥${snack.price}</span></p>
    ${qty > 0 ? `<div class="qty-badge">${qty}</div>` : ""}
  `;
        const tagPrice = itemBtn.querySelector(".tag-price");
        tagPrice.style.backgroundColor = snack.discount > 0 ? `#EA7D70` : `#ABCDDE`;
    }

    item.addEventListener("click", () => {
        const exist = cart.find(i => i.id === snack.id);

        if (exist) {
            exist.qty += 1;
            currentQty = exist.qty;
        } else {
            cart.push({ ...snack, qty: 1 });
            currentQty = 1;
        }

        updateButtonDisplay();
        updateCartListDisplay();
    });

    (snack.category === "snack" ? snackRack : drinkRack).appendChild(item);
});