// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Highlight the active navigation link
    const navLinks = document.querySelectorAll("nav a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Form validation and submission
    const form = document.getElementById("crudForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            if (validateForm()) {
                console.log("Form submitted successfully!");
            }
        });
    }

    function validateForm() {
        const inputs = form.querySelectorAll("input");
        let isValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                isValid = false;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
        });

        return isValid;
    }

    // Sorting functionality for the table
    const table = document.getElementById("dataTable");
    if (table) {
        const headers = table.querySelectorAll("th");
        headers.forEach((header, index) => {
            header.addEventListener("click", () => {
                sortTable(index);
            });
        });
    }

    function sortTable(columnIndex) {
        const rows = Array.from(table.rows).slice(1);
        const sortedRows = rows.sort((a, b) => {
            const aText = a.cells[columnIndex].innerText;
            const bText = b.cells[columnIndex].innerText;
            return aText.localeCompare(bText);
        });

        sortedRows.forEach(row => table.appendChild(row));
    }

    // Add row functionality
    const addRowButton = document.getElementById("add-row");
    const dataTableElement = document.getElementById("data-table");

    if (!addRowButton) {
        console.error('Button with id "add-row" not found in the DOM.');
        return;
    }

    if (!dataTableElement) {
        console.error('Table with id "data-table" not found in the DOM.');
        return;
    }

    const dataTable = dataTableElement.querySelector("tbody");

    // Add event listener to the "Add Row" button
    addRowButton.addEventListener("click", () => {
        // Create a new row
        const newRow = document.createElement("tr");

        // Add cells to the row
        newRow.innerHTML = `
            <td>${dataTable.rows.length + 1}</td>
            <td>New Name</td>
            <td>25</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        // Append the new row to the table
        dataTable.appendChild(newRow);

        // Add functionality to the new buttons
        attachRowActions(newRow);
    });

    // Function to attach actions to edit and delete buttons
    function attachRowActions(row) {
        const editButton = row.querySelector(".edit-btn");
        const deleteButton = row.querySelector(".delete-btn");

        // Edit button functionality
        editButton.addEventListener("click", () => {
            const nameCell = row.cells[1];
            const ageCell = row.cells[2];

            const newName = prompt("Enter new name:", nameCell.textContent);
            const newAge = prompt("Enter new age:", ageCell.textContent);

            if (newName) nameCell.textContent = newName;
            if (newAge) ageCell.textContent = newAge;
        });

        // Delete button functionality
        deleteButton.addEventListener("click", () => {
            row.remove();
        });
    }
});