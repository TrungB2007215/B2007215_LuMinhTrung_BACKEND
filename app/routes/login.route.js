const express = require("express");
const login = require("../controllers/login.controller");

const router = express.Router();

router.route("/")
    .post(login.register);

router.route("/login")
    .get(login.login)
    .post(login.login);

module.exports = router;
