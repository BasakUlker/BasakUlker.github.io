const formElements = {
    form: document.getElementById("product-form"),
    productList: document.getElementById("product-list"),
    totalElement: document.getElementById("total"),
    deleteSelectedButton: document.getElementById("delete-selected"),
    clearAllButton: document.getElementById("clear-all"),
    addButton: document.getElementById("add-button"),
    nameError: document.getElementById("nameError"),
    productName: document.getElementById("productName"),
    quantity: document.getElementById("quantity"),
    unitPrice: document.getElementById("unitPrice"),
    date: document.getElementById("date"),
    quantityError: document.getElementById("quantityError"),
    unitPriceError: document.getElementById("unitPriceError"),

};

formElements.form.addEventListener("submit", (e) => {
    e.preventDefault(); 
});

let expenses = [];
try {
    const raw = localStorage.getItem("expenses");
    expenses = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(expenses)) expenses = [];
} catch (err) {
    console.error("localStorage'tan okurken hata:", err);
    expenses = [];
}
const saveExpenses = () => {
    try {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } catch (err) {
      console.error("localStorage'a yazarken hata:", err);
    }
};

/*
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const saveExpenses = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};
*/
const generateUniqueID = () => {
    const date = document.getElementById("date");
    const timestamp = date.value.toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `product-${timestamp}-${random}`;
};

const renderExpenses = (item) => {
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
    
        formElements.productList.prepend(div);
      
    } else {
            listError.textContent = "Lütfen ürün bilgilerini eksiksiz girin.";
    }
};

let total = 0.0;
formElements.addButton.addEventListener("click", () => {
  
    var expenseModel = {
        Id : generateUniqueID(),
        Title : productName.value,
        Quantity : formElements.quantity.value,
        Amount : formElements.unitPrice.value,
        Date : formElements.date.value.toString()
        
    };
    expenses.push(expenseModel);
    console.log(expenses);
    saveExpenses();
    renderExpenses(expenseModel);

    total += expenseModel.Quantity * expenseModel.Amount;
    formElements.totalElement.textContent = total.toFixed(2); 
});

formElements.deleteSelectedButton.addEventListener("click", () => {
    const checkboxes = formElements.productList.querySelectorAll("input[type='checkbox']:checked");
    console.log(checkboxes);
    const idsToDelete = Array.from(checkboxes).map(cb => cb.value.replace("chk-", ""));
    let deletedTotal = 0.0;
    idsToDelete.forEach(id => {
        const found = expenses.find(item => item.Id === id)
        const index = expenses.findIndex(item => item.Id === id);
        const deletedQuantity = found.Quantity;
        const deletedAmount = found.Amount;
        deletedTotal += deletedQuantity * deletedAmount;
        expenses.splice(index, 1); 
    });
    total = total - deletedTotal;
    formElements.totalElement.textContent = total.toFixed(2);
    checkboxes.forEach(cb => cb.parentElement.remove());
    saveExpenses();
});

formElements.clearAllButton.addEventListener("click", () => {
    const checkboxes = formElements.productList.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.parentElement.remove());
    expenses = [];
    total = 0.0;
    formElements.totalElement.textContent = total.toFixed(2);
    saveExpenses();
});

//
//validations
//

formElements.productName.addEventListener("input", () => {
    const titleValue = formElements.productName.value.trim();
    if (titleValue.length < 3) {
        formElements.nameError.textContent = "Ürün adı en az 3 karakter olmalı!";
    } else {
        formElements.nameError.textContent = "";
    }
});

formElements.quantity.addEventListener("input", () => {
    const quantityValue = parseFloat(formElements.quantity.value);
    if (Number.isNaN(quantityValue) || quantityValue < 1) {
        formElements.quantityError.textContent = "En az 1 adet olmalı!";   
    } else {
        formElements.quantityError.textContent = "";
    }
});

formElements.unitPrice.addEventListener("input", () => {
    const unitPriceValue = parseFloat(formElements.unitPrice.value);
    if (isNaN(unitPriceValue) || unitPriceValue < 0 || unitPriceValue > 1000000){
        formElements.unitPriceError.textContent = "Birim fiyat 0 ile 1.000.000 arasında olmalı!";
    } else {
        formElements.unitPriceError.textContent = "";
        return;
    }
});

date.addEventListener("input", () => {
    const dateValue = formElements.date.value.toString();
    const dateError = document.getElementById("dateError");
    if (!dateValue) {
        dateError.textContent = "Lütfen bir tarih seçin!";
    } else {
        dateError.textContent = "";
    }
});


