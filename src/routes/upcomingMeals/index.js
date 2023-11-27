const express = require("express");
const UpcomingMeal = require("../../model/UpcomingMeal")
const router = express.Router()


router.post('/upcoming-meals', async(req, res) => {
    const upcomingMeals = req.body
    const newUpcomingMeals = new UpcomingMeal(upcomingMeals)
    const result = await newUpcomingMeals.save()
    res.send({result, insertedId: result._id})
})
router.get("/upcoming-meals", async(req, res) => {
    const result = await UpcomingMeal.find()
    res.send(result)
})













module.exports = router