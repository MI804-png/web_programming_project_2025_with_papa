let data = [
    { id: 1, name: "Alice", height: 160 },
    { id: 2, name: "Bob", height: 175 },
    { id: 3, name: "Charlie", height: 180 },
];

// Create
function createData() {
    const name = document.getElementById("createName").value.trim();
    const height = parseInt(document.getElementById("createHeight").value.trim());
    const feedback = document.getElementById("createFeedback");

    if (!name || name.length > 30 || isNaN(height)) {
        feedback.textContent = "Invalid input. Name must be non-empty and up to 30 characters. Height must be a number.";
        feedback.style.color = "red";
        return;
    }

    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    data.push({ id: newId, name, height });
    feedback.textContent = "Data created successfully!";
    feedback.style.color = "green";
}

// Read
function readData() {
    const output = document.getElementById("readOutput");
    output.innerHTML = "";

    let sum = 0;
    let max = -Infinity;

    data.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `ID: ${item.id}, Name: ${item.name}, Height: ${item.height}`;
        output.appendChild(p);

        sum += item.height;
        if (item.height > max) max = item.height;
    });

    const avg = sum / data.length;

    const stats = document.createElement("p");
    stats.innerHTML = `<strong>Sum:</strong> ${sum}, <strong>Average:</strong> ${avg.toFixed(2)}, <strong>Largest:</strong> ${max}`;
    output.appendChild(stats);
}

// Get Data for ID (Update Helper)
function getDataForId() {
    const id = parseInt(document.getElementById("updateId").value.trim());
    const item = data.find((d) => d.id === id);

    if (item) {
        document.getElementById("updateName").value = item.name;
        document.getElementById("updateHeight").value = item.height;
    } else {
        alert("No data found for the given ID.");
    }
}

// Update
function updateData() {
    const id = parseInt(document.getElementById("updateId").value.trim());
    const name = document.getElementById("updateName").value.trim();
    const height = parseInt(document.getElementById("updateHeight").value.trim());
    const feedback = document.getElementById("updateFeedback");

    if (!name || name.length > 30 || isNaN(height)) {
        feedback.textContent = "Invalid input. Name must be non-empty and up to 30 characters. Height must be a number.";
        feedback.style.color = "red";
        return;
    }

    const item = data.find((d) => d.id === id);
    if (item) {
        item.name = name;
        item.height = height;
        feedback.textContent = "Data updated successfully!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "No data found for the given ID.";
        feedback.style.color = "red";
    }
}

// Delete
function deleteData() {
    const id = parseInt(document.getElementById("deleteId").value.trim());
    const feedback = document.getElementById("deleteFeedback");

    const index = data.findIndex((d) => d.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        feedback.textContent = "Data deleted successfully!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "No data found for the given ID.";
        feedback.style.color = "red";
    }
}