const express = require('express');
const mysql = require('mysql2');
const path = require('path'); // For handling file paths
const app = express();
const port = 3000;

// Load environment variables
require('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the path for views
app.set('views', path.join(__dirname, 'views'));

// MySQL connection configuration using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,      // Use DB_HOST from .env file
    user: process.env.DB_USER,      // Use DB_USER from .env file
    password: process.env.DB_PASSWORD,  // Use DB_PASSWORD from .env file
    database: process.env.DB_NAME   // Use DB_NAME from .env file
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Route to render the homepage with the tasks
app.get('/', (req, res) => {
    // Query to fetch all tasks from the database
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            console.error('Failed to fetch tasks:', err);
            return res.status(500).json({ error: 'Failed to fetch tasks' });
        }

        // Render the index.ejs template and pass the tasks as data
        res.render('index', { tasks: results });
    });
});

// Route to add a new task (POST)
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    db.query(query, [title, description], (err, result) => {
        if (err) {
            console.error('Failed to insert task:', err);
            return res.status(500).json({ error: 'Failed to add task' });
        }
        res.status(201).json({
            id: result.insertId,
            title: title,
            description: description,
        });
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
