const express = require("express");
const login = require("../controllers/login.controller");

const router = express.Router();

router.route("/")
    .get(login.loginWith)
    .post(login.loginWith);

router.route("/login")
    .get(login.loginNow)
    .post(login.loginNow);

module.exports = router;
