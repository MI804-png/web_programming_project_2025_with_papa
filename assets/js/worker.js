let count = 0;

function incrementCounter() {
    count++;
    postMessage(`Counter: ${count}`);
    setTimeout(incrementCounter, 1000);
}

incrementCounter();