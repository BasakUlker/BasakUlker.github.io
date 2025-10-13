const form = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const totalElement = document.getElementById("total");
const deleteSelectedButton = document.getElementById("delete-selected");
const clearAllButton = document.getElementById("clear-all");

let total = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("unitPrice").value);
  const date = document.getElementById("date").value;

  if (!name || isNaN(quantity) || isNaN(price)) return;

  const subtotal = quantity * price;

  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" class="select-item" />
    <strong>${name}</strong> - ${quantity} adet × ${price.toFixed(2)} ₺ = <em>${subtotal.toFixed(2)} ₺</em>
    ${date ? ` (${date})` : ""}
  `;

  productList.appendChild(li);

  total += subtotal;
  updateTotal();

  form.reset();
});

deleteSelectedButton.addEventListener("click", () => {
    const selectedItems = document.querySelectorAll(".select-item:checked");
    selectedItems.forEach((checkbox) => {
        const li = checkbox.parentElement;
        const text = li.innerText;
        const match = text.match(/([\d.,]+) ₺$/);
        if (match) {
        total -= parseFloat(match[1].replace(",", "."));
    }
    li.remove();
  });
  updateTotal();
});

clearAllButton.addEventListener("click", () => {
  productList.innerHTML = "";
  total = 0;
  updateTotal();
});

function updateTotal() {
  totalElement.textContent = total.toFixed(2);
}
