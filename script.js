const form = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const totalElement = document.getElementById("total");
const deleteSelectedButton = document.getElementById("delete-selected");
const clearAllButton = document.getElementById("clear-all");
const addButton = document.getElementById("add-button");

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
});

function generateUniqueID(){
    const date = document.getElementById("date");
    const timestamp = date.value.toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `product-${timestamp}-${random}`;
}

//validations
const nameError = document.getElementById("nameError");
const productName = document.getElementById("productName");
productName.addEventListener("input", () => {
    const titleValue = productName.value.trim();
    if (titleValue.length < 3) {
        nameError.textContent = "Ürün adı en az 3 karakter olmalı!";
    } else {
        nameError.textContent = "";
    }
});

const quantityError = document.getElementById("quantityError");
const quantity = document.getElementById("quantity");
const quantityValue = parseFloat(quantity.value);
quantity.addEventListener("input", () => {
    if (isNaN(quantityValue) && quantityValue < 1) {
        quantityError.textContent = "En az 1 adet olmalı!";   
    } else {
        quantityError.textContent = "";
    }
});

const unitPriceError = document.getElementById("unitPriceError");
const unitPrice = document.getElementById("unitPrice");
const unitPriceValue = parseFloat(unitPrice.value);
unitPrice.addEventListener("input", () => {
    if (isNaN(unitPriceValue) && unitPriceValue < 0 && unitPriceValue > 1000000){
        unitPriceError.textContent = "Birim fiyat 0 ile 1.000.000 arasında olmalı!";
    } else {
        unitPriceError.textContent = "";
        return;
    }
});

const date = document.getElementById("date");
const dateValue = date.value.toString();
const dateError = document.getElementById("dateError");
date.addEventListener("input", () => {
    if (!dateValue) {
        dateError.textContent = "Lütfen bir tarih seçin!";
    } else {
        dateError.textContent = "";
    }
});

let total = 0.0;
addButton.onclick = function(){
    
    var expenses = [];
    const productName = document.getElementById("productName");
    const quantity = document.getElementById("quantity");
    const unitPrice = document.getElementById("unitPrice");
    const date = document.getElementById("date");
    
    
    var expenseModel = {
        Id : generateUniqueID(),
        Title : productName.value,
        Quantity : quantity.value,
        Amount : unitPrice.value,
        Date : date.value.toString()
        
    };
    expenses.push(expenseModel);
    console.log(expenses);
    
    const listError = document.getElementById("listError");
    expenses.forEach(item => {
        if (item.Title && isNaN(item.Quantity) && isNaN(item.Amount) && item.Date) {
            const div = document.createElement("div"); 
            div.classList.add("expense-item");
        
            const productTotal = (item.Quantity * item.Amount).toFixed(2);
            const text = `${item.Title} - ${item.Quantity} adet - ${item.Amount} ₺ - total: ${productTotal} ₺ - ${item.Date}`;

            const newContent = document.createTextNode(text);
            div.appendChild(newContent);
            const currentDiv = document.getElementById("productList");
            document.body.insertBefore(div, currentDiv);

            productList.prepend(div);
 
            total += item.Quantity * item.Amount;
            totalElement.textContent = total.toFixed(2);   
        } else {
            listError.textContent = "Lütfen ürün bilgilerini eksiksiz girin.";
        }
    });
    
    
}

deleteSelectedButton.onclick = function(){

}

clearAllButton.onclick = function(){
    
}


