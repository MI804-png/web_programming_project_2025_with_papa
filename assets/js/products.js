document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Product A", price: 100, category: "Category 1" },
        { id: 2, name: "Product B", price: 150, category: "Category 2" },
        { id: 3, name: "Product C", price: 200, category: "Category 3" },
        { id: 4, name: "Product D", price: 250, category: "Category 4" },
    ];

    const tableBody = document.getElementById("tableBody");
    const searchInput = document.getElementById("searchInput");
    let pickedColumnIndex = null; // Stores the index of the picked column
    let chartInstance = null; // Stores the Chart.js instance

    // Function to populate the table with products
    function populateTable() {
        tableBody.innerHTML = ""; // Clear existing rows
        products.forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.category}</td>
            `;
            tableBody.appendChild(row);
        });

        // Update the chart after populating the table
        renderChart();
    }

    // Function to pick a column
    window.pickColumn = function (columnIndex) {
        pickedColumnIndex = columnIndex;
        const columnNames = ["ID", "Name", "Price", "Category"];
        const newPosition = prompt(
            `You picked the "${columnNames[columnIndex]}" column. Enter the new position (1-4):`
        );

        if (newPosition && !isNaN(newPosition)) {
            const targetIndex = parseInt(newPosition) - 1;
            if (targetIndex >= 0 && targetIndex < 4) {
                rearrangeColumn(columnIndex, targetIndex);
            } else {
                alert("Invalid position. Please enter a number between 1 and 4.");
            }
        }
    };

    // Function to rearrange a column
    function rearrangeColumn(fromIndex, toIndex) {
        const rows = Array.from(tableBody.querySelectorAll("tr"));

        rows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll("td"));
            const pickedCell = cells[fromIndex];
            cells.splice(fromIndex, 1); // Remove the picked cell
            cells.splice(toIndex, 0, pickedCell); // Insert it at the new position

            // Clear the row and append the rearranged cells
            row.innerHTML = "";
            cells.forEach((cell) => row.appendChild(cell));
        });

        // Rearrange the header as well
        const headers = Array.from(document.querySelectorAll("#productsTable thead th"));
        const pickedHeader = headers[fromIndex];
        headers.splice(fromIndex, 1); // Remove the picked header
        headers.splice(toIndex, 0, pickedHeader); // Insert it at the new position

        const headerRow = document.querySelector("#productsTable thead tr");
        headerRow.innerHTML = "";
        headers.forEach((header) => headerRow.appendChild(header));

        // Update the chart after rearranging columns
        renderChart();
    }

    // Function to filter the table
    function filterTable() {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const match = Array.from(cells).some((cell) =>
                cell.textContent.toLowerCase().includes(filter)
            );
            row.style.display = match ? "" : "none";
        });
    }

    // Function to render the chart
    function renderChart() {
        const productNames = Array.from(tableBody.querySelectorAll("tr")).map(
            (row) => row.children[1].textContent // Get the "Name" column
        );
        const productPrices = Array.from(tableBody.querySelectorAll("tr")).map(
            (row) => parseFloat(row.children[2].textContent.replace("$", "")) // Get the "Price" column
        );

        // Destroy the previous chart instance if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Create a new chart
        const ctx = document.getElementById("productChart").getContext("2d");
        chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: productNames,
                datasets: [
                    {
                        label: "Product Prices ($)",
                        data: productPrices,
                        backgroundColor: ["#007BFF", "#28A745", "#FFC107", "#DC3545"],
                        borderColor: ["#0056b3", "#1e7e34", "#e0a800", "#c82333"],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return `$${value}`; // Add dollar sign to y-axis labels
                            },
                        },
                    },
                },
            },
        });
    }

    // Attach event listeners
    searchInput.addEventListener("input", filterTable);

    // Initialize the table and chart
    populateTable();
});