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

let total = 0.0;
addButton.onclick = function(){
    
    var expenses = [];
    const productName = document.getElementById("productName");
    const quantity = document.getElementById("quantity");
    const unitPrice = document.getElementById("unitPrice");
    const date = document.getElementById("date");
    
    //validations
    const titleValue = productName.value.trim();
    const quantityValue = parseFloat(quantity.value);
    const unitPriceValue = parseFloat(unitPrice.value);
    const dateValue = date.value.toString();
    
    if (titleValue.length < 3) {
        alert("Ürün adı en az 3 karakter olmalı!");
        return;
    }
    
    if (isNaN(quantityValue) || quantityValue < 1) {
        alert("Adet en az 1 olmalı!");
        return;
    }

    if (isNaN(unitPriceValue) || unitPriceValue < 0.00001 || unitPriceValue > 1000000){
        alert("Birim fiyat 0.00001 ile 1.000.000 arasında olmalı!");
        return;
    }

    if (!dateValue) {
        alert("Lütfen bir tarih seçin!");
        return;
    }
    //
    var expenseModel = {
        Id : generateUniqueID(),
        Title : productName.value,
        Quantity : quantity.value,
        Amount : unitPrice.value,
        Date : date.value.toString()
        
    };
    expenses.push(expenseModel);
    console.log(expenses);
    
   
    expenses.forEach(item => {
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
    });
    
    
}

deleteSelectedButton.onclick = function(){

}

clearAllButton.onclick = function(){
    
}


