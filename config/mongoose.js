const mongoose = require('mongoose');
// const {MONGO_URI} = require("../config/db.env");
const MONGO_URI = "mongodb+srv://myselfanuragharsh:d1uxCkvux2uRB92D@cluster0.phgoywo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
	.connect(
		MONGO_URI,{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log("connection established!");
	})
	.catch((err) => {
		console.log("error ",err);
	});