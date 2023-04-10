// show button
const showFromButton = document.getElementById('show-from-button');
const from = document.getElementById('form');

showFromButton.addEventListener('click', () => {
    from.style.display = 'block';
})

//create table
const table = document.getElementById("table");
const tableHeaders = [
    { id: '#' },
    { name: "NAME" },
    { description: "DESCRIPTION" },
    { status: "STATUS" },
    { rate: "RATE" },
    { balance: "BALANCE" },
    { deposit: "DEPOSIT" },
    { Action: "ACTION" },
]
//create table-header
const tHead = table.createTHead();
const thRow = tHead.insertRow();
tableHeaders.forEach((element) => {
    const td = thRow.insertCell();
    const value = Object.values(element)[0];
    td.appendChild(document.createTextNode(value));
});
//display data
async function getCustomer() {
    let response;
    try {
        response = await fetch("http://localhost:3000/Customer");
        const Customer = await response.json();
        createTableBody(Customer);
    } catch (error) {
        console.error(error);
    }
}
// add from data
function addFromData() {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let status = document.getElementById("status").value;
    let rate = document.getElementById("rate").value;
    let balance = document.getElementById("balance").value;
    let deposit = document.getElementById("deposit").value;
    fetch("http://localhost:3000/Customer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            description: description,
            status: status,
            rate: rate,
            balance: balance,
            deposit: deposit
        }),
    });
}
//edit customer
function editCustomer(element) {
    let id = element.id;
    let name = document.getElementById("name").value = element.name;
    let description = document.getElementById("description").value = element.description;
    let status = document.getElementById("status").value = element.status;
    let rate = document.getElementById("rate").value = element.rate;
    let balance = document.getElementById("balance").value = element.balance;
    let deposit = document.getElementById("deposit").value = element.deposit;

    var updateButton = document.getElementById('addbutton');
    updateButton.onclick = function updateData() {
        fetch(`http://localhost:3000/Customer/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                status: document.getElementById("status").value,
                rate: document.getElementById("rate").value,
                balance: document.getElementById("balance").value,
                deposit: document.getElementById("deposit").value,

            }),
        });
    }
}

// delete customer
function deleteCustomer(id) {
    fetch(`http://localhost:3000/Customer/${id}`, {
        method: "DELETE",
    });
    getCustomer();
}
// validate name
function validatenameInput() {
    const nameRegex = /^([a-zA-Z0-9_-\s]){3,25}$/;
    const nameInput = document.getElementById('name').value;
    const AddCustomerBtn = document.getElementById("addbutton");
    const nameError = document.getElementById('name-error');

    if (!nameRegex.test(nameInput) || nameInput.trim() === "") {
        AddCustomerBtn.disabled = true;
        nameError.style.display = 'block';
    } else {
        AddCustomerBtn.disabled = false;
        nameError.style.display = 'none';
    }
}

// validate description
function validatedescriptionInput() {
    const descriptionRegex = /^([a-zA-Z0-9_-\s\.\,]){3,150}$/;
    const descriptionInput = document.getElementById('description').value;
    const AddCustomerBtn = document.getElementById("addbutton");
    const descriptionError = document.getElementById('description-error');

    if (!descriptionRegex.test(descriptionInput)) {
        AddCustomerBtn.disabled = true;
        descriptionError.style.display = 'block';
    } else {
        AddCustomerBtn.disabled = false;
        descriptionError.style.display = 'none';
    }
}

// validate status
function validatesatusInput() {
    // const StatusRegex = /^([a-zA-Z0-9_-]){3,150}$/;
    const StatusInput = document.getElementById('status').value;
    const AddCustomerBtn = document.getElementById("addbutton");
    const StatusError = document.getElementById('Status-error');

    if (StatusInput === ' ') {
        AddCustomerBtn.disabled = true;
        StatusError.style.display = 'block';
    } else {
        AddCustomerBtn.disabled = false;
        StatusError.style.display = 'none';
    }
}

// validate Rate
function validateRateInput() {
    const RateRegex =/^.{3,150}$/
    const RateInput = document.getElementById('rate').value;
    const AddCustomerBtn = document.getElementById("addbutton");
    const RateError = document.getElementById('rate-error');

    if (!RateRegex.test(RateInput)) {
        AddCustomerBtn.disabled = true;
        RateError.style.display = 'block';
    } else {
        AddCustomerBtn.disabled = false;
        RateError.style.display = 'none';
    }
}
// validate balance
function validateBalanceInput() {
    const balanceRegex =/^.{3,150}$/;
    const balanceInput = document.getElementById('balance').value;
    const AddCustomerBtn = document.getElementById("addbutton");
    const balanceError = document.getElementById('balance-error');

    if (!balanceRegex.test(balanceInput)) {
        AddCustomerBtn.disabled = true;
        balanceError.style.display = 'block';
    } else {
        AddCustomerBtn.disabled = false;
        balanceError.style.display = 'none';
    }
}

// validate deposit
function validatedepositInput() {
    const depositRegex =/^.{3,150}$/;
    const depositInput = document.getElementById('deposit').value;
    const AddCustomerBtn = document.getElementById("addbutton");
    const depositError = document.getElementById('deposit-error');

    if (!depositRegex.test(depositInput)) {
        AddCustomerBtn.disabled = true;
        depositError.style.display = 'block';
    } else {
        AddCustomerBtn.disabled = false;
        depositError.style.display = 'none';
    }
}

// empty form
function checkForm() {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let status = document.getElementById("status").value;
    let rate = document.getElementById("rate").value;
    let balance = document.getElementById("balance").value;
    let deposit = document.getElementById("deposit").value;
    const AddCustomerBtn = document.getElementById("addbutton");

    if (name.trim() === "" || description.trim() === ""
        || status.trim() === ""
        || rate.trim() === ""
        || balance.trim() === ""
        || deposit.trim() === "") {
        AddCustomerBtn.disabled = true;
    } else {
        AddCustomerBtn.disabled = false;
    }
}

//create table-body
let tBody = table.createTBody();
// crete table body
function createTableBody(Customer) {
    table.removeChild(table.getElementsByTagName('tbody')[0]);
    tBody = table.createTBody();
    Customer.forEach((element) => {
        const tr = tBody.insertRow();
        tableHeaders.forEach((header) => {
            const td = tr.insertCell();
            if (header.Action !== "ACTION") {
                const key = Object.keys(header)[0];
                td.appendChild(document.createTextNode(element[key]));
            } else {
                let editbutton = document.createElement("button");
                editbutton.innerText = "Edit";
                editbutton.classList.add('edit');
                editbutton.onclick = () => editCustomer(element);
                td.appendChild(editbutton);

                let deletebutton = document.createElement("button");
                deletebutton.innerText = "Delete";
                deletebutton.classList.add('delete');
                deletebutton.onclick = () => deleteCustomer(element.id);
                td.appendChild(deletebutton);
            }
        });
    });
}


window.onload = (event) => {
    getCustomer();
};
