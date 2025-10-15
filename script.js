const form = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const totalElement = document.getElementById("total");
const deleteSelectedButton = document.getElementById("delete-selected");
const clearAllButton = document.getElementById("clear-all");

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
});

function generateUniqueID(){
    const date = document.getElementById("date");
    const timestamp = date.value.toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `product-${timestamp}-${random}`;
}

const addButton = document.getElementById("add-button");
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
    
   
    expenses.forEach(item => {
        const div = document.createElement("div"); 
        div.classList.add("expense-item");
        
        const total = (item.Quantity * item.Amount).toFixed(2);
        const text = `${item.Title} - ${item.Quantity} adet - ${item.Amount} ₺ - total: ${total} ₺ - ${item.Date}`;

        const newContent = document.createTextNode(text);
        div.appendChild(newContent);
        const currentDiv = document.getElementById("productList");
        document.body.insertBefore(div, currentDiv);
    });
    
    
}



