require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ease_event',
  waitForConnections: true,
  connectionLimit: 10,
});

// Create users table if not exists
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    conn.release();
    console.log('Database ready');
  } catch (err) {
    console.error('Database setup error:', err);
  }
})();

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertId, email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered',
      token,
      user: { id: result.insertId, first_name, last_name, email }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
app.get('/api/auth/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    const [users] = await pool.query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [decoded.userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[0]);
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//===============event details
//Add this after your auth routes

//Events table setup (add to your database initialization)
(async () => {
    try {
        const conn = await pool.getConnection();
        await conn.query(`
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                category VARCHAR(50) NOT NULL,
                event_date DATE NOT NULL,
                location VARCHAR(255) NOT NULL,
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        conn.release();
        console.log('Events table ready');
    } catch (err) {
        console.error('Events table setup error:', err);
    }
})();

// Events API Routes
app.get('/api/events', async (req, res) => {
    try {
        const [events] = await pool.query('SELECT * FROM events');
        res.json(events);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/events/:id', async (req, res) => {
    try {
        const [event] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
        if (event.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event[0]);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/events', async (req, res) => {
    try {
        const { title, description, category, event_date, location, image_url } = req.body;
        const [result] = await pool.query(
            'INSERT INTO events (title, description, category, event_date, location, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, category, event_date, location, image_url]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/events/:id', async (req, res) => {
    try {
        const { title, description, category, event_date, location, image_url } = req.body;
        await pool.query(
            'UPDATE events SET title = ?, description = ?, category = ?, event_date = ?, location = ?, image_url = ? WHERE id = ?',
            [title, description, category, event_date, location, image_url, req.params.id]
        );
        res.json({ message: 'Event updated successfully' });
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM events WHERE id = ?', [req.params.id]);
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Server error' });
    }
});