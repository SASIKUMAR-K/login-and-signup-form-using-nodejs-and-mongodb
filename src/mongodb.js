const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb+srv://sasikumar05112004:S8QrLbeSBFwLPHNq@cluster0.ts93cy3.mongodb.net/SRDB'
	)
	.then(() => {
		console.log('mongoose connected');
	})
	.catch((e) => {
		console.log('failed');
	});

const det = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	emailaddress: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const dbcol = new mongoose.model('dbcols', det);

module.exports = dbcol;
