const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/teachers/', (req, res) => {
    console.log('in get call for teacherList');
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
   
})

router.post('/', (req, res) =>{
    
})

router.put('/teacher/:id', (req, res)=>{
    
})

module.exports = router;