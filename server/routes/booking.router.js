const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/teachers/', (req, res) => {
    console.log('in get call /api/booking/teachers for teacherList');
    const queryText = `SELECT id, name FROM teacher`;
    pool.query(queryText)
    .then((result)=>{
        console.log('retrieved teacherList from database:', result.rows);
        res.send(result.rows);        
    }).catch((error)=>{
        console.log('error retrieving teacher profile:', error);
        res.sendStatus(500);     
    })
});

router.get('/student/:id', (req,res)=>{
   console.log('in get call /api/booking/student/:id for targetStudent');
   const user_id = req.params.id;
   const queryText = `SELECT id, name FROM student WHERE user_id=$1`;
   pool.query(queryText, [user_id])
   .then((result)=>{
       console.log('retrieved stduent from database:', result.rows);
       res.send(result.rows);
   }).catch((error) =>{
       console.log('error retreiving student from database:', error);
       res.sendStatus(500);
   })
})

router.get('/teacher/:id', (req, res)=>{
    console.log('in get call api/booking/teacher/:id for targetTeacher');
    const user_id = req.params.id;
    const queryText = `SELECT id, name FROM teacher WHERE user_id=$1`;
    pool.query(queryText, [user_id])
    .then((result)=>{
        console.log('retrieved teacher from database:', result.rows);
        
    })
})

router.post('/', (req, res) =>{
    console.log('in post call for api/booking with req.body:', req.body);
    const student_id = req.body.student_id;
    const teacher_id = req.body.teacher_id;
    const date_made = req.body.date_made;
    const requested_lesson_date= req.body.requested_lesson_date;
    const requested_lesson_time = req.body.requested_lesson_time;
    const status = req.body.status;
    const queryText = `INSERT INTO booking(student_id, teacher_id, date_made, 
        requested_lesson_date, requested_lesson_time, status) VALUES($1, $2, $3, $4, $5, $6)`
    pool.query(queryText, [student_id, teacher_id, date_made, requested_lesson_date, requested_lesson_time, status])
    .then((result)=>{
        console.log('successfully posted booking to database:', result);
        res.sendStatus(201);
    })
    .catch((error)=>{
        console.log('error posting booking to database:', error);
        res.sendStatus(500);
    })
})

router.put('/teacher/:id', (req, res)=>{
    
})

module.exports = router;