// Declare a global variable to store the chart instance
let productChart;

// Function to render the chart
function renderChart(labels, data) {
    const productChartCanvas = document.getElementById("productChart").getContext("2d");

    // Destroy the previous chart instance if it exists
    if (productChart) {
        productChart.destroy();
    }

    // Check if there is data to render
    if (labels.length === 0 || data.length === 0) {
        console.warn("No data available to render the chart.");
        return; // Skip rendering the chart
    }

    // Create a new chart instance
    productChart = new Chart(productChartCanvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Product Prices",
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Products"
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Price (in USD)"
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                }
            }
        }
    });

    console.log("Chart rendered successfully.");
}

// Fetch data and render the chart on page load
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
                // Extract labels and data for the chart
                const labels = data.list.map(item => item.name);
                const chartData = data.list.map(item => parseFloat(item.weight));

                // Render the chart
                renderChart(labels, chartData);

                // Generate HTML table
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
                console.warn("No data available from the server.");
                renderChart([], []); // Render an empty chart
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            contentDiv.innerHTML = "<p>Failed to load data. Please try again later.</p>";
        });
});