const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//connect to a database
const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password: 'test',
		database: 'face-recognition-db'
	}
});

//connect to front-end
const app = express();
app.use(bodyParser.json());
app.use(cors());

//handle routes
app.post('/signin',signin.handleSignin(db,bcrypt))
app.post('/register',register.handleRegister(db,bcrypt))
app.get('/profile/:id',profile.handleProfile(db))
app.put('/image',image.handleImage(db))
app.post('/imageurl', (req,res) => { image.handleApiCall(req,res)})

app.listen(3001, () => {
	console.log('app is running on port 3001');
})