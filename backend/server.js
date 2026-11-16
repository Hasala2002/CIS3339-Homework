const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', require('./routes/students'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enrollments', require('./routes/enrollments'));

// unknown api routes
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// serve the built vue app, and send everything else to index.html so refreshing a route works
const dist = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(dist));
app.get('/{*splat}', (req, res) => res.sendFile(path.join(dist, 'index.html')));

// catch-all error handler, mostly for bad json bodies
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' });
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

// connect to mongo first, only then start listening
const PORT = process.env.PORT || 3000;
mongoose.connection.on('error', (err) => console.error('MongoDB error:', err.message));
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB:', err.message);
        process.exit(1);
    });
