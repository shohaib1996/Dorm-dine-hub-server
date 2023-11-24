const express = require("express");
const Meal = require('../../model/Meal')
const router = express.Router()

router.get("/meals", async(req, res) => {
    const result = await Meal.find()
    res.send(result)
})
router.get("/meals/:id", async (req, res) => {
    const id = req.params.id;
    const service = await Meal.findById(id);
    res.send(service);
})

module.exports = router