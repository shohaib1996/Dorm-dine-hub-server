const express = require("express");
const createToken = require('../../api/Authentication/createToken')

const router = express.Router();

router.post("/jwt", createToken)

module.exports = router