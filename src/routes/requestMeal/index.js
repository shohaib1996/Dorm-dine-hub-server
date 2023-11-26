const express = require("express");
const RequestMeal = require('../../model/RequestedMeal')
const router = express.Router()

router.post("/request-meals", async(req, res) => {
    const request_meals = req.body
    const newRequestMeal = new RequestMeal(request_meals)
    const result = await newRequestMeal.save()
    res.send({result, insertedId: result._id})
})
router.get("/request-meals", async(req, res) => {
    const result = await RequestMeal.find()
    res.send(result)
})


module.exports = router