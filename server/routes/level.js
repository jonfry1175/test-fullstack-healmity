const levelRouter = require("express").Router();
const {Level } = require("../models");

levelRouter.get("/", (req, res) => {
    Level.findAll()
        .then((levels) => {
            res.status(200).json(levels);
        })
        .catch((err) => {
            res.status(500).json(err.message);
        });
});

module.exports = levelRouter