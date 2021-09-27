const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        
        user: 'postgres',
        password: '12345',
        database: 'smart-brain'
    }
});

db.select('*').from('users').then(data =>{} );

const app = express();
app.use(express.json());
app.use(cors());
// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'john',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         },
//     ]
// }
//create a basic route to check everything works

app.get('/', (req, res) => {
    res.send('success');  // go to postman and do a GET for root
})

app.post('/signin', (req,res) =>{signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req,res) =>{register.handleRegister(req, res, db, bcrypt)} )

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)}) 
    

app.put('/image', (req, res) => {image.handleImage(req, res, db)} )
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)} )
    

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3001, () => {
    console.log('app up 3001');
})


/*
/ --> res = working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT user
*/