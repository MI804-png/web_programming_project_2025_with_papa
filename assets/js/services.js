// Web Storage
function saveToLocalStorage() {
    const input = document.getElementById("storageInput").value;
    if (input) {
        localStorage.setItem("webStorageData", input);
        alert("Data saved to Local Storage!");
    } else {
        alert("Please enter some data to save.");
    }
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("webStorageData");
    const output = document.getElementById("storageOutput");
    if (data) {
        output.textContent = `Loaded from Local Storage: ${data}`;
    } else {
        output.textContent = "No data found in Local Storage.";
    }
}

// Web Workers
let worker;

function startWorker() {
    if (typeof Worker !== "undefined") {
        if (!worker) {
            worker = new Worker("../assets/js/worker.js");
            worker.onmessage = function (event) {
                document.getElementById("workerOutput").textContent = `Worker says: ${event.data}`;
            };
        }
    } else {
        alert("Web Workers are not supported in your browser.");
    }
}

function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = null;
        document.getElementById("workerOutput").textContent = "Worker stopped.";
    }
}

// Server-Sent Events
function startSSE() {
    if (typeof EventSource !== "undefined") {
        const sseOutput = document.getElementById("sseOutput");
        const eventSource = new EventSource("../assets/sse.php");

        eventSource.onmessage = function (event) {
            sseOutput.textContent = `Server says: ${event.data}`;
        };

        eventSource.onerror = function () {
            sseOutput.textContent = "Error receiving updates from the server.";
            eventSource.close();
        };
    } else {
        alert("Server-Sent Events are not supported in your browser.");
    }
}