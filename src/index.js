const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const dbcol = require('./mongodb');
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);

app.set('view engine', 'hbs');
app.set('views', tempelatePath);
app.use(express.static(publicPath));

// hbs.registerPartials(partialPath)

app.get('/signup', (req, res) => {
	res.render('signup');
});
app.get('/', (req, res) => {
	res.render('login');
});

// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
	// const data = new LogInCollection({
	//     name: req.body.name,
	//     password: req.body.password
	// })
	// await data.save()

	const data = {
		name: req.body.name,
		emailaddress: req.body.emailaddress,
		password: req.body.password,
	};

	const check = await dbcol.findOne({ name: req.body.name });
	if (check == null) {
		await dbcol.insertMany([data]);
		return res.status(201).render('login', {
			info: 'Successfully Registered',
		});
	} else {
		if (
			check.name === req.body.name &&
			check.emailaddress === req.body.emailaddress &&
			check.password === req.body.password
		) {
			res.status(201).render('signup', { msg: 'User already exists!!!' });
		} else {
			await dbcol.insertMany([data]);
			return res.status(201).render('login', {
				info: 'Successfully Registered',
			});
		}
	}
});

app.post('/login', async (req, res) => {
	const check = await dbcol.findOne({ emailaddress: req.body.emailaddress });
	if (check == null) {
		res.status(201).render('login', { msg: 'Invalid user' });
	} else if (check.password != req.body.password) {
		res.status(201).render('login', { msg: 'Incorrect password' });
	} else if (check.password === req.body.password) {
		res.status(201).render('home', { loginname: check.name });
	}
});

app.listen(port, () => {
	console.log('port connected');
});
