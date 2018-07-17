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

router.put('/:id', (req,res)=>{
    console.log('in put call for lesson record with id:', req.params.id);
    console.log('req.body for put call is:', req.body);
    
    const id = req.params.id;
    const strengths = req.body.strengths;
    const points_of_improvement = req.body.points_of_improvement;
    const vocab = req.body.vocab;
    const phrases = req.body.phrases;
    const comments = req.body.comments;
    const queryText = `UPDATE record SET strengths=$2, points_of_improvement=$3, vocab=$4, phrases=$5, comments=$6 where id=$1`
    pool.query(queryText, [id, strengths, points_of_improvement, vocab, phrases, comments])
    .then((result)=>{
        console.log('updated lesson record');
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('error updating lesson records:', error);
        res.sendStatus(500);
    })
})

module.exports = router;