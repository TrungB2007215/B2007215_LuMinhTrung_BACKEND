const express = require("express");
const contracts = require("../controllers/contact.controller");

const router = express.Router();

router.route("/favorite")
    .get(contracts.findAllFavorite);

router.route("/:id")
    .get(contracts.findOne)
    .put(contracts.update)
    .delete(contracts.delete);

router.route("/")
    .get(contracts.findAll)
    .post(contracts.create)
    .delete(contracts.deleteAll);

module.exports = router;