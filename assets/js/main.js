document.addEventListener("DOMContentLoaded", () => {
    const productTable = document.getElementById("productsTable").querySelector("tbody");
    const productForm = document.getElementById("productForm");
    let productChart = null; // Global variable to store the chart instance

    // Function to render the chart
    function renderChart(labels, data) {
        const ctx = document.getElementById('productChart').getContext('2d');

        // Destroy the previous chart instance if it exists
        if (productChart) {
            productChart.destroy();
        }

        // Create a new chart instance
        productChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Product Prices',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Function to update the chart based on the table data
    function updateChart() {
        const rows = productTable.querySelectorAll("tr");
        const productNames = [];
        const productPrices = [];

        // Extract product names and prices from the table
        rows.forEach(row => {
            const nameCell = row.cells[1];
            const priceCell = row.cells[2];

            if (nameCell && priceCell) {
                productNames.push(nameCell.textContent.trim());
                productPrices.push(parseFloat(priceCell.textContent.replace("$", "").trim()));
            }
        });

        renderChart(productNames, productPrices);
    }

    // Attach actions to all existing rows on page load
    const existingRows = productTable.querySelectorAll("tr");
    existingRows.forEach(row => attachRowActions(row, updateChart));

    // Handle form submission to add a new product
    productForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get input values
        const productName = document.getElementById("productName").value.trim();
        const productPrice = document.getElementById("productPrice").value.trim();

        if (productName && productPrice) {
            addRowToTable(productTable, productName, productPrice, updateChart);

            // Clear the form inputs
            productForm.reset();

            // Update the chart
            updateChart();
        } else {
            alert("Please fill in both fields.");
        }
    });

    // Initial chart rendering
    updateChart();
});

document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");

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
                let html = "<table><thead><tr><th>ID</th><th>Name</th><th>Height</th><th>Weight</th><th>Code</th></tr></thead><tbody>";
                data.list.forEach(item => {
                    html += `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.height}</td>
                        <td>${item.weight}</td>
                        <td>${item.code}</td>
                    </tr>`;
                });
                html += "</tbody></table>";
                contentDiv.innerHTML = html;
            } else {
                contentDiv.innerHTML = "<p>No data available.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            contentDiv.innerHTML = "<p>Failed to load data. Please try again later.</p>";
        });
});