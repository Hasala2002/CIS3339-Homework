const express = require('express');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json(await Course.find().sort('courseId'));
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: 'Course ID already exists' });
        if (err.name === 'ValidationError') return res.status(400).json({ error: 'Course ID and name are required' });
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        await Enrollment.deleteMany({ course: course._id });
        res.json(course);
    } catch (err) {
        if (err.name === 'CastError') return res.status(404).json({ error: 'Course not found' });
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
