const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// list all, or search by name if ?name= is given
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.name) {
            const escaped = req.query.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            filter.name = new RegExp(escaped, 'i');
        }
        res.json(await Student.find(filter).sort('name'));
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: 'Student ID already exists' });
        if (err.name === 'ValidationError') return res.status(400).json({ error: 'Name, student ID, phone and zip are required' });
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json(student);
    } catch (err) {
        if (err.name === 'CastError') return res.status(404).json({ error: 'Student not found' });
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
