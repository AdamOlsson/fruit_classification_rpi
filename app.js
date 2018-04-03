const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require('body-parser');

const resultsRoutes = require('./api/results');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //TODO Change to only localhost
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/results', resultsRoutes);

app.use((req, res, next) => {
    console.log("Request not found.");
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;
