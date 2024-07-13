# Task-Manager
This is a CRUD (Create, Read, Update, Delete) application for managing tasks. It uses Node.js, Express, and MySQL on the backend, and HTML, CSS, and JavaScript on the frontend.

Before you begin, ensure you have the following installed on your machine:

Node.js (v14 or higher)
npm (Node package manager, comes with Node.js)
MySQL(Xampp)

Here is setup instructions:
Clone the Repository:
git clone https://github.com/AmnaRiaz12/Task-Manager.git
cd task-manager

Set Up MySQL Database:
Start your MySQL server.
Create a database named "task_manager"
Use the following SQL commands to create a tasks table:
USE task_manager;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productCode VARCHAR(255) NOT NULL,
  product VARCHAR(255) NOT NULL,
  qty INT NOT NULL,
  perPrice DECIMAL(10, 2) NOT NULL
);

Note:
"Update the MySQL connection settings in app.js if needed."

Run the following command to start your Node.js server:
node app.js

To Access the Application Open your web browser and navigate to:
http://localhost:5000

Usage:

Add a Task: Fill in the product details in the form and click Submit.
Edit a Task: Click the Edit button next to a task, update the details in the form, and click Submit.
Delete a Task: Click the Delete button next to a task to remove it from the list.