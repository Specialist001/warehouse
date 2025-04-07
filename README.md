# Warehouse App on Laravel with Vue.js and Inertia.js

## Description

This project is a web application built using Laravel, Vue.js, and Inertia.js. It includes authentication via email.
The application is designed to manage warehouse operations, including inventory management, order processing, and reporting.

## Requirements

- PHP ^8.2
- Node.js
- Composer
- NPM or Yarn

## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:Specialist001/warehouse.git
    cd warehouse
    ```

2. Install PHP dependencies:

    ```bash
    composer install
    ```

3. Install JavaScript dependencies:

    ```bash
    npm install
    ```

   or

    ```bash
    yarn install
    ```

4. Copy the `.env.example` file to `.env` and configure the environment variables:

    ```bash
    cp .env.example .env
    ```

5. Generate the application key:

    ```bash
    php artisan key:generate
    ```

6. Run the database migrations:

    ```bash
    php artisan migrate
    ```
   or with seeding:

    ```bash
    php artisan migrate --seed
    ```

## Running the Application

1. Start the development server:

    ```bash
    npm run dev
    ```

   or

    ```bash
    yarn dev
    ```

2. Start the Laravel server:

    ```bash
    php artisan serve
    ```

## Building for Production

To build the project for production, run:

```bash
npm run build
```

or

```bash
yarn build
```

## License
This project is licensed under the custom MIT License. See the [LICENSE.md](LICENSE.md) file for details.
