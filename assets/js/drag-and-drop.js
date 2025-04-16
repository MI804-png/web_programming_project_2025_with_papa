document.addEventListener("DOMContentLoaded", () => {
    const draggableItems = document.querySelectorAll(".draggable-item");
    const dropZone = document.getElementById("dropZone");

    // Add dragstart event to draggable items
    draggableItems.forEach((item) => {
        item.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id);
            event.target.style.opacity = "0.5";
        });

        item.addEventListener("dragend", (event) => {
            event.target.style.opacity = "1";
        });
    });

    // Add dragover and drop events to the drop zone
    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault(); // Allow dropping
        dropZone.classList.add("drag-over");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("drag-over");
    });

    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        dropZone.classList.remove("drag-over");

        const itemId = event.dataTransfer.getData("text/plain");
        const draggedItem = document.getElementById(itemId);

        if (draggedItem) {
            dropZone.appendChild(draggedItem);
        }
    });
});