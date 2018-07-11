const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/student/:id', (req, res) => {
    console.log('in get call for student profile:', req.params);
    const id = req.params.id;
    const queryText = `SELECT * FROM student WHERE id=$1`;
    pool.query(queryText, [id])
    .then((result)=>{
        console.log('retrieved student profile from database');
        res.send(result.rows)
    }).catch((error)=>{
        console.log('error retrieving student profile:', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;