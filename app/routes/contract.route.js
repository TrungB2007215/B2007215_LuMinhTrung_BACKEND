const express = require("express");
const contracts = require("../controllers/contract.controller");

const router = express.Router();

router.route("/")
    .get(contracts.findAll)
    .post(contracts.create)
    .delete(contracts.deleteAll);

router.route("/favorite")
    .get(contracts.findAllFavorite);

router.route("/:id")
    .get(contracts.findOne)
    .put(contracts.update)
    .delete(contracts.delete);

module.exports = router;