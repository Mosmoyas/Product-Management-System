
let header = document.getElementById("header");
let formContainer = document.getElementById("products");

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total")
let category = document.getElementById("category");
let count = document.getElementById("count");

let btnCreate = document.getElementById("btnCreate");
let search = document.getElementById("search");
let btnSearchTitle = document.getElementById("btnSearchTitle");
let btnSearchCategory = document.getElementById("btnSearchCategory");
let tableBody = document.getElementById("tbody");
let rechnen = document.querySelector(".rechnen");
let DeleteAllBtn = document.createElement("button");
// let tr = document.createElement("tr")
// tableBody.appendChild(tr);
let buttonStatus = "Create";
let products = JSON.parse(localStorage.getItem("product")) || [];


let temp;
//create product

btnCreate.onclick = () => {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value, taxes: taxes.value, ads: ads.value,
        discount: discount.value, total: total.innerHTML, count: count.value,
        category: category.value.toLowerCase()
    }
    if (buttonStatus === "Create") {
        if (newProduct.count > 1) {
            for (let i = 0; i < +count.value; i++) {

                products.push(newProduct)
            }
        } else {
            products.push(newProduct)
        }
        SaveInLocalStorage(products);
    }
    else {
        products[temp] = newProduct;
        buttonStatus = "Create"
        btnCreate.value = buttonStatus;
        count.style.display = "block"
        console.log("logs")
    }
    SaveInLocalStorage(products);
   
    loadProducts();
}

//save localstorage
function SaveInLocalStorage(product) {
    localStorage.setItem("product", JSON.stringify(product))
}
//clear inputs
function clearInputs() {
    // console.log(product.length);
    title.value = "", price.value = "";
    taxes.value = "";
    ads.value = ""; discount.value = "";
    count.value = ""; category.value = "";
    total.innerHTML = "";
    total.style.backgroundColor = "#930909";


}
// total
document.addEventListener("keyup", (e) => {
    if (e.target.className == "rechnen") {
        if (title.value != "" && price.value > 0) {
            total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
            total.style.backgroundColor = "green";
        }
    }
})

//read
function loadProducts() {

    tableBody.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        let tr = document.createElement("tr")
        tr.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><input id="updates" onclick=updates(${i}) type="button" value="update"></td>
                    <td><input id="deletes" onclick=deleteMe(${i}) type="button" value="delete "></td>
                </tr>
           
        `
        tableBody.appendChild(tr);

    }

}

loadProducts();

//function to update data ---------------------
function updates(id) {
    title.focus();
    title.value = products[id].title,
        price.value = products[id].price,
        taxes.value = products[id].taxes,
        ads.value = products[id].ads,
        discount.value = products[id].discount,
        total.innerHTML = products[id].total,
        count.style.display = "none",
        category.value = products[id].category;
    total.style.backgroundColor = "green";
    buttonStatus = "Update"

    btnCreate.value = buttonStatus;

    temp = id;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}

//delete
function deleteMe(id) {

    products.splice(id, 1);
    SaveInLocalStorage(products);
    loadProducts();

    if (products.length > 0) {
        DeleteAllBtn.textContent = `Delete ( ${products.length} ) Product`;
    } else {
        formContainer.removeChild(DeleteAllBtn)
    }

}

//create button to delete all data from localstorage
function createDeleteButton() {

    document.addEventListener("DOMContentLoaded", () => {
        // let product = JSON.parse(localStorage.getItem("product")) || [];

        if (products.length > 0) {
            DeleteAllBtn.textContent = `Delete ( ${products.length} ) Products`;
            DeleteAllBtn.setAttribute("class", "btndelete");
            formContainer.append(DeleteAllBtn);

        }

    });
}
createDeleteButton()
//Clear All Storage

document.addEventListener("click", (e) => {
    if (e.target.className === "btndelete") {
        localStorage.removeItem("product");
        formContainer.removeChild(DeleteAllBtn)
        // localStorage.clear()
        // products.splice(0);
        formContainer.removeChild(DeleteAllBtn)
    }
    loadProducts()
})
//search

let searchMod = "title";
function searchingByMod(id) {
    if (id === btnSearchTitle.id) {
        searchMod = "title";
        search.setAttribute("placeholder", "Search By Title");
    }
    else {
        searchMod = "category";
        search.setAttribute("placeholder", "Search By Category");

    }
}

function searching(value) {
    tableBody.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i][searchMod].includes(search.value.toLowerCase())) {
            let tr = document.createElement("tr")
            tr.innerHTML += `<tr>
                        <td>${i + 1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><input id="updates" onclick=updates(${i}) type="button" value="update"></td>
                        <td><input id="deletes" onclick=deleteMe(${i + 1}) type="button" value="delete "></td>
                        </tr>`
            tableBody.appendChild(tr);

        }


    }

}







//clean data