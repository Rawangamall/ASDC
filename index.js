const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
require("dotenv").config({ path: "config.env" });
const path=require("path");

//import routes
const ProductRoute = require('./Routes/ProductRoute')

let port = process.env.PORT || 8080;
const app = express();
const server = require("http").createServer(app);

//db connection
mongoose.set("strictQuery", true); //warning

mongoose
	.connect(
        "mongodb://localhost:27017"	)
	.then(() => {
		console.log("DB connected");
		server.listen(port, () => {
			console.log("server is listenng.....", port);
		});
	})
	.catch((error) => {
		console.log("Db Problem " + error);
	});

app.use(
	cors({
		origin: "*",
	})
);

//body parse
app.use(bodyParser.json());


//routes
app.use(ProductRoute);

//Not Found Middleware
app.use((request, response, next) => {
	response
		.status(404)
		.json({ message: `${request.originalUrl} not found on this server!` });
});


//Global error handeling Middleware
app.use((error, request, response, next) => {
	if (error.statusCode && error.statusCode !== 500) {
		// the specific status code from the AppError
		response.status(error.statusCode).json({ message: error.message });
	} else {
		//the default 500 status code handling
		response.status(500).json({ message: error + "" });
	}
});