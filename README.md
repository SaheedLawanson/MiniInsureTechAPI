3# Mini InsureTech API

Mini InsureTech API is a backend application designed to simulate a mini insuretech system. The API allows users to purchase insurance plans using their wallets, manage pending policies, and activate policies. 

## Features
- Fetch available products grouped by category and price.
- Purchase plans with specified quantities, with wallet deductions.
- Manage pending policies under purchased plans.
- Activate policies and associate them with users.
- Prevent duplicate policies for the same product category per user.
- Filter and view policies by plan or activation status.

## Requirements
- Docker
- Node.js (Version 20 or higher)
- npm (Included with Node.js)

## Project Setup

### 1. Start the PostgreSQL Database
- Run the following command to start a PostgreSQL database instance using Docker (replace `<username>`, `<password>` and `<database_name>` with your choice):
  ```bash
  docker run --name my-postgres-server \
    -e POSTGRES_USER=<username> \
    -e POSTGRES_PASSWORD=<password> \
    -e POSTGRES_DB=<database_name> \
    -p 5432:5432 \
    -d postgres
  ```

### 2. Clone the Repository
- Clone the repository from github
  ```bash
  git clone https://github.com/SaheedLawanson/MiniInsureTechAPI
  ```

- Navigate into the project directory
  ```bash
  cd MiniInsureTechAPI
  ```

### 3. Install Dependencies
- Install the required depencencies
  ```bash
  npm install
  ```

### 4. Run Database Migration and Seeders
- Setup environment variables using the `env.example` file as a guide

- Set up the database with necessary migrations and seed data:
  ```bash
  npm run migrate:up
  npm run seed:up
  ```

### 5. Start the Application
- Run the application start script
  ```bash
  npm start
  ```

### 6. Postman Collection
To simplify API testing, a Postman collection is included in this repository. You can import the collection into Postman to test all the endpoints.

1. Download the Collection: MiniInsureTechAPI.postman_collection.json
2. Import into Postman:
    - Open Postman.
    - Click the Import button.
    - Upload the MiniInsureTechAPI.postman_collection.json file.

### 7. Future Improvements
- Authentication & Authorization: Implement a robust authentication system to ensure that only authorized users can access certain endpoints.
- Transaction Logs: Add a feature to log all wallet transactions, including plan purchases and refunds.
- Wallet Top-Up: Allow users to fund their wallets via external payment gateways.
- Policy Expiration: Introduce expiry dates for activated policies and automate notifications for renewals.
- Advanced Filtering: Improve filtering options for the List Policies endpoint to include date ranges and user-specific searches.
- Admin Dashboard: Build a dashboard to monitor plans, policies, and user activity.