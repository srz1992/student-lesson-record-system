const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  console.log('req.user:', req.user);
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);
  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const type = req.body.type

  const queryText = `INSERT INTO users (username, password, type) VALUES ($1, $2, $3) RETURNING id`;
  pool.query(queryText, [username, password, type])
    .then(
      (result) => { 

        if(req.body.type === 'student'){

          console.log('result.rows:', result.rows[0].id);
          console.log('result:', result);
          

          const name = req.body.name;
          const date_of_birth = req.body.date_of_birth;
          const hometown = req.body.hometown;
          const hobbies = req.body.hobbies;
          const notes = req.body.notes;
          const user_id = result.rows[0].id;
          console.log('user_id:', user_id);
          const queryText = `INSERT INTO student (name, date_of_birth, hometown, hobbies, notes, user_id) VALUES ($1, $2, $3, $4, $5, $6)`
          pool.query(queryText, [name, date_of_birth, hometown, hobbies, notes, user_id])
          .then(()=> {res.sendStatus(201);})
          .catch((err) => {res.sendStatus(500);})
        }
        else if(req.body.type === 'teacher'){
          console.log('result.rows:', result.rows[0].id);
          console.log('result:', result);
          

          const name = req.body.name;
          const date_of_birth = req.body.date_of_birth;
          const hometown = req.body.hometown;
          const hobbies = req.body.hobbies;
          const user_id = result.rows[0].id;
          console.log('user_id:', user_id);
          const queryText = `INSERT INTO teacher (name, date_of_birth, hometown, hobbies, user_id) VALUES ($1, $2, $3, $4, $5)`
          pool.query(queryText, [name, date_of_birth, hometown, hobbies, user_id])
          .then(()=> {res.sendStatus(201);})
          .catch((err) => {res.sendStatus(500);})
        }
      }
      
      )
    .catch((err) => { next(err); })
    ;
});

router.post('/registerStudent', (req, res) => {
  console.log('req:', req.body);
  const name = req.body.name;
  const date_of_birth = req.body.date_of_birth;
  const hometown = req.body.hometown;
  const hobbies = req.body.hobbies;
  const notes = req.body.notes;
  const user_id = req.body.user_id;
  const queryText = `INSERT INTO student (name, date_of_birth, hometown, hobbies, notes, user_id) VALUES ($1, $2, $3, $4, $5, $6)`
  pool.query(queryText, [name, date_of_birth, hometown, hobbies, notes, user_id])
  .then(()=> {res.sendStatus(201);})
  .catch((err) => {res.sendStatus(500);})
})

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
