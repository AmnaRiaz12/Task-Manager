const baseUrl = 'http://localhost:5000'; 

document.addEventListener('DOMContentLoaded', fetchTasks);

function onFormSubmit(event) {
    event.preventDefault();
    const formData = readFormData();
    if (!formData.id) {
        createTask(formData);
    } else {
        updateTask(formData);
    }
    resetForm();
}

function readFormData() {
    const formData = {};
    formData.id = document.getElementById("taskId").value;
    formData.productCode = document.getElementById("productCode").value;
    formData.product = document.getElementById("product").value;
    formData.qty = document.getElementById("qty").value;
    formData.perPrice = document.getElementById("perPrice").value;
    return formData;
}

function insertNewRecord(data) {
    const table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.length);
    newRow.setAttribute('data-id', data.id);
    newRow.insertCell(0).innerHTML = data.productCode;
    newRow.insertCell(1).innerHTML = data.product;
    newRow.insertCell(2).innerHTML = data.qty;
    newRow.insertCell(3).innerHTML = data.perPrice;
    newRow.insertCell(4).innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("taskId").value = selectedRow.getAttribute('data-id');
    document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("product").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML;
}

function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        const row = td.parentElement.parentElement;
        const id = row.getAttribute('data-id');
        deleteTask(id, row);
    }
}

function resetForm() {
    document.getElementById("taskId").value = '';
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}

function fetchTasks() {
    fetch(`${baseUrl}/tasks`)
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => insertNewRecord(task));
        })
        .catch(error => console.error('Error:', error));
}

function createTask(data) {
    fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(task => {
        insertNewRecord(task);
    })
    .catch(error => console.error('Error:', error));
}

function updateTask(data) {
    fetch(`${baseUrl}/tasks/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
        const row = document.querySelector(`tr[data-id='${data.id}']`);
        row.cells[0].innerHTML = data.productCode;
        row.cells[1].innerHTML = data.product;
        row.cells[2].innerHTML = data.qty;
        row.cells[3].innerHTML = data.perPrice;
        resetForm();
    })
    .catch(error => console.error('Error:', error));
}

function deleteTask(id, row) {
    fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        row.remove();
    })
    .catch(error => console.error('Error:', error));
}
