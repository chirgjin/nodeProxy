const express = require("express");
const http = require("http");
const path = require("path");
const request = require("request").defaults({
	jar : true
});

require('dotenv').config();

const port = process.env.PORT || 7777;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const base = function (req) {
	const host = () => {
		return req.hostname.indexOf(HOSTNAME) > -1 ? 'http:\/\/' + req.hostname.replace('.' + HOSTNAME, '') : null;
	};
	//console.log(host(), req.hostname, HOSTNAME)
	return process.env.baseurl || process.env.BASEURL || host() || process.env.fallbackurl;
};

const app = express();
const server = http.createServer(app);

server.listen(port);
server.on("listening", () => console.log(`Server on ${port}`));

app.post("/__stats", express.json(), express.urlencoded(), (req,res) => {
	res.json("Working on it buddy");
});

app.use("*", (req,res) => {
	// let cookies = req.header("Cookie");
	req.pipe( request({
		url : base(req) + req.originalUrl,
		// headers : {
			// cookie : cookies
		// }
	})).pipe(res);
});
