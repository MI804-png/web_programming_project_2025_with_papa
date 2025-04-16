// Function to attach actions to a row
function attachRowActions(row, updateChartCallback) {
    const editButton = row.querySelector(".edit-btn");
    const deleteButton = row.querySelector(".delete-btn");

    // Remove existing event listeners by cloning the buttons
    const newEditButton = editButton.cloneNode(true);
    const newDeleteButton = deleteButton.cloneNode(true);

    editButton.replaceWith(newEditButton);
    deleteButton.replaceWith(newDeleteButton);

    // Attach new event listeners
    newEditButton.addEventListener("click", () => {
        const nameCell = row.cells[1];
        const priceCell = row.cells[2];

        const newName = prompt("Enter new product name:", nameCell.textContent);
        const newPrice = prompt("Enter new product price:", priceCell.textContent.replace("$", ""));

        if (newName) nameCell.textContent = newName;
        if (newPrice) priceCell.textContent = `$${parseFloat(newPrice).toFixed(2)}`;

        // Update the chart after editing
        updateChartCallback();
    });

    newDeleteButton.addEventListener("click", () => {
        row.remove();

        // Update the chart after deletion
        updateChartCallback();
    });
}

// Function to add a new row to the table
function addRowToTable(productTable, productName, productPrice, updateChartCallback) {
    const newRow = document.createElement("tr");
    const productId = productTable.rows.length + 1; // Generate a unique ID for the row

    // Add cells to the row
    newRow.id = `product-${productId}`;
    newRow.innerHTML = `
        <td>${productId}</td>
        <td>${productName}</td>
        <td>$${parseFloat(productPrice).toFixed(2)}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    // Append the new row to the table
    productTable.appendChild(newRow);

    // Attach actions to the new row
    attachRowActions(newRow, updateChartCallback);
}

// Fetch data from the API and populate the table
document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");
    const productTable = document.getElementById("productsTable").querySelector("tbody");

    // Fetch data from the API
    fetch("http://gamf.nhely.hu/ajax2/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "op=read&code=ABCDEF123456" // Replace with your actual code
        })
        .then(response => response.json())
        .then(data => {
            if (data.list && data.list.length > 0) {
                data.list.forEach(item => {
                    addRowToTable(productTable, item.name, item.weight, updateChart);
                });
            } else {
                contentDiv.innerHTML = "<p>No data available.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            contentDiv.innerHTML = "<p>Failed to load data. Please try again later.</p>";
        });
});