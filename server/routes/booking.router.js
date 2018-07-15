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

router.get('/:id', (req, res)=>{
    console.log('in get call for api/booking to get bookings for teacher_id:', req.params.id);
    teacher_id = req.params.id;
    const queryText = `SELECT booking.*, student.name FROM booking JOIN student ON student_id = student.id WHERE teacher_id=$1 AND status='Pending';`
    // 
    pool.query(queryText, [teacher_id])
    .then((result)=>{
        console.log('successfully got booking requests for teacher:', result.rows);
        res.send(result.rows);
    })
    .catch((error)=>{
        console.log('error getting booking requests for teacher:', error);
        res.sendStatus(500);
    })
})

router.get('/:id', (req, res)=>{
    console.log('in get call for api/booking to get bookings for teacher_id:', req.params.id);
    teacher_id = req.params.id;
    const queryText = `SELECT booking.*, student.name FROM booking JOIN student ON student_id = student.id WHERE teacher_id=$1 AND status='Pending';`
    // 
    pool.query(queryText, [teacher_id])
    .then((result)=>{
        console.log('successfully got booking requests for teacher:', result.rows);
        res.send(result.rows);
    })
    .catch((error)=>{
        console.log('error getting booking requests for teacher:', error);
        res.sendStatus(500);
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

router.put('/accept/:id', (req, res)=>{
    console.log('in put request for /api/booking/accept/:id with id:', req.params.id);
    const id = req.params.id;
    const queryText = `UPDATE booking SET status='Accepted' WHERE id=$1 returning id, student_id, teacher_id, requested_lesson_date as date, requested_lesson_time as time;`
    pool.query(queryText, [id])
    .then((result)=>{
        console.log('creating lesson record. here is what we got back from updating booking:', result.rows);
        const booking_id = result.rows[0].id;
        const student_id = result.rows[0].student_id;
        const teacher_id = result.rows[0].teacher_id;
        const date = result.rows[0].date;
        const time = result.rows[0].time;
        const queryText = `INSERT INTO record
        (booking_id, student_id, teacher_id, date, time, strengths, points_of_improvement, vocab, phrases, comments)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        
        pool.query(queryText, [booking_id, student_id, teacher_id, date, time, '', '', '{""}', '{""}',''])
        .then((result)=>{
            console.log('successfully updating booking status and created lesson record');
            res.sendStatus(201);
        })
        .catch((error)=>{
            console.log('error creating lesson record:', error);
            res.sendStatus(500);
            
        })
    }).catch((error)=>{
        console.log('error updating booking status:', error);
        res.sendStatus(500);
    })
})

router.put('/reject/:id', (req, res)=>{
    console.log('in put request for /api/booking/reject/:id with id:', req.params.id);
    const id = req.params.id;
    const queryText = `UPDATE booking SET status='Unavailable' WHERE id=$1;`
    pool.query(queryText, [id])
    .then((result)=>{
        console.log('successfully updating booking status to rejected');
        res.sendStatus(200);
        
    }).catch((error)=>{
        console.log('error updating booking status:', error);
        res.sendStatus(500);
        
    })
})

module.exports = router;