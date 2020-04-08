"use strict";
const {startServer} = require("./bin");
const PORT = process.env.PORT||'8080';
startServer(PORT);