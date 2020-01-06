const express = require('express');
const Schedules = require('../models/schedules');

const router = express.Router();


/**
 * HTTP GET /schedules/:month
 * DB에서 month에 맞는 일정들을 가져온다. 
 */
router.get(
    '/',
    async (req, res, next) => {
        const schedules = await Schedules.readSchedules({ year: req.query.year, month: req.query.month });
        res.json(schedules);
    }
);

/**
 * HTTP POST /schedules
 * 새로운 일정을 추가한다.
 */
router.post(
    '/',
    (req, res, next) => {
        Schedules.createSchedule(
            {
                date: req.body.date,
                content: req.body.event
            }
        )
        .then(
            () => { res.json({ result: 'success' }) } 
        )
        .catch(
            (err) => { res.json({ result: 'failed', content: err }) }
        );
    }
);

module.exports = router;