const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("This is only used for testing.");
    res.status(200).json({
        message: "All went okay."
    });
});

router.post('/', (req, res, next) => {
    console.log("New POST request received.");
    const data = req.body;
    console.log(data);
    req.app.io.emit("FromAPI", data);
    res.status(200).json({
        message: "Data received",
        results: data.results
    });
});

module.exports = router;
