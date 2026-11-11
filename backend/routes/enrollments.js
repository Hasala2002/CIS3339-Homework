const express = require('express');
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

const router = express.Router();

// ?course=<id> gives the roster for that course
router.get('/', async (req, res) => {
    try {
        const filter = req.query.course ? { course: req.query.course } : {};
        res.json(await Enrollment.find(filter).populate('student').populate('course'));
    } catch (err) {
        if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid course' });
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { student, course } = req.body;
        if (!student || !course) return res.status(400).json({ error: 'Student and course are required' });
        // make sure both actually exist
        if (!(await Student.exists({ _id: student })) || !(await Course.exists({ _id: course }))) {
            return res.status(404).json({ error: 'Student or course not found' });
        }
        res.status(201).json(await Enrollment.create({ student, course }));
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: 'Student is already enrolled in this course' });
        if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid student or course' });
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
