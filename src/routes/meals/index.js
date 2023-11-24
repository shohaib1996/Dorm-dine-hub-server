const express = require("express");
const Meal = require('../../model/Meal')
const router = express.Router()

router.get("/meals", async(req, res) => {
    const result = await Meal.find()
    res.send(result)
})

module.exports = router