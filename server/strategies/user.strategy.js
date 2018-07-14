const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT id, username, type FROM users WHERE id = $1', [id]).then((result) => {
    // Handle Errors
    const user = result && result.rows && result.rows[0];
    console.log('strategy user is:', user);
    if (user.type === 'student'){
      const secondQuery = `SELECT users.id, users.username, users.type, student.id AS student_id FROM users JOIN student ON users.id = student.user_id WHERE users.id=$1;`
      pool.query(secondQuery, [user.id])
      .then((secondResult)=>{
        console.log('secondResult student:', secondResult.rows[0]);
        completeUser = secondResult && secondResult.rows && secondResult.rows[0];
        console.log('student. user:', completeUser);
        if (!completeUser) {
          // user not found
          done(null, false, { message: 'Incorrect credentials.' });
        } else {
          // user found
          console.log('Your plan worked, Sean');
          
          done(null, completeUser);
        }
      })
    }
    else if (user.type === 'teacher'){
      const secondQuery = `SELECT users.id, users.username, users.type, teacher.id AS teacher_id FROM users JOIN teacher ON users.id = teacher.user_id WHERE users.id=$1;`
      pool.query(secondQuery, [user.id])
      .then((secondResult)=>{
        console.log('secondResult teacher:', secondResult.rows[0]);
        completeUser = secondResult && secondResult.rows && secondResult.rows[0];
        console.log('teacher. user:', completeUser);
        if (!completeUser) {
          // user not found
          done(null, false, { message: 'Incorrect credentials.' });
        } else {
          // user found
          done(null, completeUser);
        }
      })
    }

    else{
    console.log('in admin login. user is:', user);
  
    if (!user) {
      // user not found
      done(null, false, { message: 'Incorrect credentials.' });
    } else {
      // user found
      done(null, user);
    }
  }

  }).catch((err) => {
    console.log('query err ', err);
    done(err);
  });
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username',
}, ((req, username, password, done) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username])
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
          // all good! Passwords match!
          done(null, user);
        } else if (user) {
          // not good! Passwords don't match!
          done(null, false, { message: 'Incorrect credentials.' });
        } else {
          // not good! No user with that name
          done(null, false);
        }
      }).catch((err) => {
        console.log('error', err);
        done(null, {});
      });
  })));

module.exports = passport;
