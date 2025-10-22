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


quantity.addEventListener("input", () => {
    const quantityError = document.getElementById("quantityError");
    const quantity = document.getElementById("quantity");
    const quantityValue = parseFloat(quantity.value);
    if (Number.isNaN(quantityValue) || quantityValue < 1) {
        quantityError.textContent = "En az 1 adet olmalı!";   
    } else {
        quantityError.textContent = "";
    }
});


unitPrice.addEventListener("input", () => {
    const unitPriceError = document.getElementById("unitPriceError");
    const unitPrice = document.getElementById("unitPrice");
    const unitPriceValue = parseFloat(unitPrice.value);
    if (isNaN(unitPriceValue) || unitPriceValue < 0 || unitPriceValue > 1000000){
        unitPriceError.textContent = "Birim fiyat 0 ile 1.000.000 arasında olmalı!";
    } else {
        unitPriceError.textContent = "";
        return;
    }
});


date.addEventListener("input", () => {
    const date = document.getElementById("date");
    const dateValue = date.value.toString();
    const dateError = document.getElementById("dateError");
    if (!dateValue) {
        dateError.textContent = "Lütfen bir tarih seçin!";
    } else {
        dateError.textContent = "";
    }
});

let expenses = [];
function renderExpenses(item){
    
    if (item.Title || isNaN(item.Quantity) || isNaN(item.Amount) || item.Date) {
        listError.textContent = "   ";
        const div = document.createElement("div"); 
        div.classList.add("expense-item");
            
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `chk-${item.Id}`;
            
        const label = document.createElement("label");
        label.htmlFor = checkbox.id;

        const productTotal = (item.Quantity * item.Amount).toFixed(2);
        const text = `${item.Title} - ${item.Quantity} adet - ${item.Amount} ₺ - total: ${productTotal} ₺ - ${item.Date}`;
    
        checkbox.value = item.Id;
    
        label.textContent = text;

        div.appendChild(checkbox);
    
        div.appendChild(label);
    
        const currentDiv = document.getElementById("productList");
    
        document.body.insertBefore(div, currentDiv);
    
        productList.prepend(div);
      
    } else {
            listError.textContent = "Lütfen ürün bilgilerini eksiksiz girin.";
    }
   
}

let total = 0.0;
addButton.onclick = function(){
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
    renderExpenses(expenseModel);

    total += expenseModel.Quantity * expenseModel.Amount;
    totalElement.textContent = total.toFixed(2);   
    
      
}


deleteSelectedButton.onclick = function(){
    const checkboxes = productList.querySelectorAll("input[type='checkbox']:checked");
    console.log(checkboxes);
    const idsToDelete = Array.from(checkboxes).map(cb => cb.value.replace("chk-", ""));
    
    idsToDelete.forEach(id => {
        const index = expenses.indexOf(id);
        const deletedQuantity = expenses.at(id).Quantity;
        const deletedAmount = expenses.at(id).Amount;
        total -= deletedQuantity * deletedAmount;
        totalElement.textContent = total.toFixed(2);
        expenses.splice(index, 1);  
    });

    checkboxes.forEach(cb => cb.parentElement.remove());
    
}

clearAllButton.onclick = function(){
    const checkboxes = productList.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.parentElement.remove());
    expenses = [];
    total = 0.0;
    totalElement.textContent = total.toFixed(2);
    
}


