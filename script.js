const STORAGE_KEY = "shopping_items_v1"; 
const productNameInput = document.getElementById("productName");
const quantityInput = document.getElementById("quantity");
const unitPriceInput = document.getElementById("unitPrice");
const gettingDate = document.getElementById("date")
const addButton = document.getElementById("addButton");
const deleteSelected = document.getElementById("delete-selected");
const clearAll = document.getElementById("clear-all");
const productList = document.getElementById("productList");
const totalPriceElement = document.getElementById("totalPrice");

addButton.addEventListener("click", () => {
    
    const productName = productNameInput.value;
    const quantity = parseInt(quantityInput.value);
    const unitPrice = parseFloat(unitPriceInput.value);

    const total = quantity * unitPrice;

    const product = {
        name: productName,
        quantity: quantity,
        unitPrice: unitPrice,
        total: total
    };

    saveProduct(product);
    addProductToList(product);

    productNameInput.value = "";
    quantityInput.value = "";
    unitPriceInput.value = "";

});

function saveProduct(product) {

    let products = JSON.parse(localStorage.getItem("prodcuts")) || [];

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products))
};

function addProductToList(product) {

    const li = document.createElement("li");
    li.textContent = '${product.name} : ${product.quantity} x ${product.unitPrice} = ${product.total} TL';
    productList.append(li);
     
    updateTotal;

};