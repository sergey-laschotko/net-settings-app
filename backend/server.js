const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

server.get("/", (req, res) => {
    res.json("Server works");
});

server.get("/wifi-nets", async (req, res) => {
    fs.readFile("mock.json", (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json("Internal Server Error");
        } else {
            res.json(JSON.parse(result));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});