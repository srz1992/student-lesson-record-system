const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log('in get call for lesson records:', req.params);
    const student_id = req.params.id;
    const queryText = `SELECT record.*, teacher.name as teacher_name FROM record JOIN teacher on record.teacher_id = teacher.id WHERE student_id=$1 ORDER BY record.date DESC, record.time DESC;`;
    pool.query(queryText, [student_id])
    .then((result)=>{
        console.log('retrieved lesson records from database');
        res.send(result.rows)
    }).catch((error)=>{
        console.log('error retrieving lesson records:', error);
        res.sendStatus(500);
    })
});

module.exports = router;