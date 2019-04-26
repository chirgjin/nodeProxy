const express = require("express");
const http = require("http");
const path = require("path");
const request = require("request");

require('dotenv').config();

const port = process.env.PORT || 7777;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const base = function (req) {
	return process.env.baseurl || process.env.BASEURL || req.host.replace(HOSTNAME, '') || process.env.fallbackurl;
};

const app = express();
const server = http.createServer(app);

server.listen(port);
server.on("listening", () => console.log(`Server on ${port}`));

app.post("/__stats", express.json(), express.urlencoded(), (req,res) => {
	res.json("Working on it buddy");
});

app.use("*", (req,res) => {
	req.pipe( request( (base(req) + req.originalUrl) ) ).pipe(res);
});
