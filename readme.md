### Taskify

### 1. Clone the Repository

To get started, clone the repository from GitHub using the following command:

```bash
git clone https://github.com/sriram-ravi705/Taskify.git
cd Taskify
```

### 2. Install Dependencies

Next, install the required dependencies using `npm`:

```bash
npm install
```

This will install all the necessary packages listed in the `package.json` file.

### 3. Create the `.env` File

The project requires a `.env` file to store sensitive data such as your RDS connection details.

1. **Create a `.env` file** in the root directory.
2. Add the following details in the `.env` file:

```ini
DB_HOST={RDS_ENTRYPOINT}
DB_USER={RDS_USER}
DB_PASSWORD={RDS_PASSWORD}
DB_NAME={RDS_DATABASE_NAME}
```

### 4. Running the Application

Once your `.env` file is set up, you can run the application using the following command:

```bash
node index.js
```

This will start the server and connect it to the MySQL database.

### 5. Accessing the Application

After the server is running, open your web browser and access the app at:

```http
http://{public_ipv4_address}:{app_port_number}
```

Replace `{public_ipv4_address}` with your server’s public IP address, and `{app_port_number}` with the port number your app is running on (e.g., `3000`).

---

### Notes:
- **Security**: Make sure **not** to commit the `.env` file to version control (e.g., GitHub). You can add `.env` to `.gitignore` to keep it private.
- **Database Connection**: Ensure that your RDS instance is accessible, and your security group settings allow access from your local environment or server.