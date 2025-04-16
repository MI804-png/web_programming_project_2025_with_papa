// Base class for a menu
class Menu {
    constructor(menuItems) {
        this.menuItems = menuItems; // Array of menu items
    }

    // Method to create a menu
    createMenu() {
        const ul = document.createElement("ul");
        ul.className = "oojs-menu";

        this.menuItems.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            li.addEventListener("click", () => alert(`You clicked on ${item}`));
            ul.appendChild(li);
        });

        return ul;
    }
}

// Extended class for a styled menu
class StyledMenu extends Menu {
    constructor(menuItems, containerId) {
        super(menuItems); // Call the parent class constructor
        this.containerId = containerId; // ID of the container to append the menu
    }

    // Method to render the menu in the specified container
    renderMenu() {
        const container = document.getElementById(this.containerId);
        if (container) {
            const menu = this.createMenu(); // Call the parent class method
            container.appendChild(menu); // Append the menu to the container
        } else {
            console.error(`Container with ID "${this.containerId}" not found.`);
        }
    }
}

// Menu items
const menuItems = ["Home", "About", "Services", "Products", "Contact"];

// Create and render the menu
const oojsMenu = new StyledMenu(menuItems, "oojsMenuContainer");
oojsMenu.renderMenu();