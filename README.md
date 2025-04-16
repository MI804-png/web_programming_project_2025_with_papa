# Website Project Documentation

## Project Overview
This project is a web application developed for the Web-programming-1 Lecture Homework. It features a structured layout with multiple pages, including an index page, and implements CRUD functionality with a 4x4 table. The application utilizes modern web technologies, including HTML5, CSS3, JavaScript, AJAX, and ChartJS.

## Project Structure
The project is organized as follows:

```
website-project
├── assets
│   ├── css
│   │   └── styles.css        # CSS styles for the website
│   ├── js
│   │   ├── app.js            # Main JavaScript functionality
│   │   ├── chart.js          # ChartJS integration
│   │   └── ajax.js           # AJAX functionality for CRUD operations
│   ├── images                 # Directory for images
│   └── data
│       └── data.json         # Sample data for CRUD operations
├── pages
│   ├── about.html            # About page with unique content
│   ├── contact.html          # Contact page with unique content
│   ├── services.html         # Services page with unique content
│   └── products.html         # Products page with unique content
├── index.html                # Main entry point of the website
└── README.md                 # Project documentation
```

## Features
- **Responsive Design**: The website is designed to be responsive and user-friendly across various devices.
- **Navigation Menu**: A horizontal navigation menu allows users to easily navigate between pages.
- **CRUD Functionality**: Users can create, read, update, and delete entries in a 4x4 table.
- **Data Visualization**: Integration of ChartJS for visual representation of data based on table selections.
- **AJAX Operations**: Asynchronous operations for data handling without page reloads.
- **Form Validation**: Input fields are validated to ensure data integrity.

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   ```
2. **Navigate to the Project Directory**:
   ```
   cd website-project
   ```
3. **Open the `index.html` File**: Open `index.html` in a web browser to view the application.

## Usage
- Use the navigation menu to access different pages.
- Interact with the 4x4 table to perform CRUD operations.
- Select a row in the table to visualize data using charts.
- Fill out forms with valid data to ensure successful operations.

## Creators
- **Mikhael 1** - Neptun Code: IHUTSC
- **Abdulrahman 2** - Neptun Code: DEF456

For any questions or issues, please refer to the documentation or contact the creators.
## API Specification
For details about the API used in the AJAX task, refer to the [API Specification](api-specification.md).