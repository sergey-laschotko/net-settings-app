const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");

const Settings = require("./models/settings");

mongoose.connect("mongodb://localhost/testform", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(e => {
        console.log(e.message);
    });


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

server.post("/save-settings", (req, res) => {
    const settings = req.body.settings;
    const savingSettings = new Settings(settings);
    savingSettings.save((err) => {
        if (err) {
            res.status(500).json(false);
        }
        res.status(200).json(true);
    });
});

server.get("/last-settings", (req, res) => {
    Settings.findOne().sort({ createdAt: -1 })
        .then((results) => {
            res.json(results);
        })
        .catch(e => {
            res.status(500).json(false);
        })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});