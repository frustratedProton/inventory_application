# Gunpla Inventory App

A simple web application created for learning purposes, focusing on managing Gunpla models and categories. Built with Node.js, Express, and PostgreSQL, this app serves as a practice project for working with these technologies.

## Features

- **Category Management**: Add, edit, and delete categories.
- **Item Management**: Add, edit, and view individual items within categories.
- **Dynamic Views**: Render views for categories and items using EJS templates.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/frustratedProton/inventory_application.git
   ```
2. Navigate to the project directory:
   ```bash
   cd inventory_application
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your PostgreSQL database and update the configuration file with your database details.

5. Run `populate.js` to fill the database with initial data::
   ```bash
   node db/populate.js
   ```
6. Start the application:
   ```bash
   npm start
   ```