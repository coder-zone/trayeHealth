const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let URL = process.env.MONGO_URI;

mongoose.connect(
	URL,
	{ useNewUrlParser: true,useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.error('Could not connect to MongoDB !');
			console.log(err);
		} else {
			console.log('MongoDB: Connected to Database !');
		}
	}
);