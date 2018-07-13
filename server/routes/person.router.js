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
        res.send(...result.rows)
    }).catch((error)=>{
        console.log('error retrieving student profile:', error);
        res.sendStatus(500);
    })
});

router.get('/teacher/:id', (req,res)=>{
    console.log('in get call for teacher profile:', req.params);
    const id = req.params.id;
    const queryText = `SELECT * FROM teacher WHERE id=$1`;
    pool.query(queryText, [id])
    .then((result)=>{
        console.log('retrieved teacher profile from database');
        res.send(...result.rows);        
    }).catch((error)=>{
        console.log('error retrieving teacher profile:', error);
        res.sendStatus(500);     
    })
    
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

router.put('/student/:id', (req, res) =>{
    console.log('req.body:', req.body);
    const id = req.body.id;
    const name = req.body.name;
    const date_of_birth = req.body.date_of_birth;
    const hometown = req.body.hometown;
    const hobbies = req.body.hobbies;
    const notes = req.body.notes;
    const queryText = `UPDATE student SET name=$2, date_of_birth=$3, hometown=$4, hobbies=$5, notes=$6 where id=$1`
    pool.query(queryText, [id, name, date_of_birth, hometown, hobbies, notes])
    .then((result)=>{
        console.log('student profile update successful:', result);
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating student profile:', error);
        res.sendStatus(500);
    })
})

router.put('/teacher/:id', (req, res)=>{
    console.log('req.body:', req.body);
    const id = req.body.id;
    const name = req.body.name;
    const date_of_birth = req.body.date_of_birth;
    const hometown = req.body.hometown;
    const hobbies = req.body.hobbies;
    const queryText = `UPDATE teacher SET name=$2, date_of_birth=$3, hometown=$4, hobbies=$5 WHERE id=$1`;
    pool.query(queryText, [id, name, date_of_birth, hometown, hobbies])
    .then((result)=>{
        console.log('teacher profile update successful:', result);
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating teacher profile:', error);
        res.sendStatus(500);
    })
})

module.exports = router;