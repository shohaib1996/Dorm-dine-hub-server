const express = require("express");
const UpcomingMeal = require("../../model/UpcomingMeal")
const router = express.Router()


router.post('/upcoming-meals', async (req, res) => {
    const upcomingMeals = req.body
    const newUpcomingMeals = new UpcomingMeal(upcomingMeals)
    const result = await newUpcomingMeals.save()
    res.send({ result, insertedId: result._id })
})
router.get("/upcoming-meals", async (req, res) => {
    const { admin } = req.query
    let query = {}
    if(admin){
        query = { admin_Email: { $regex: new RegExp(admin, 'i') } };
    }

    const result = await UpcomingMeal.find(query).sort({ likes: -1 })
    res.send(result)
})
router.put("/upcoming-meals/:id", async (req, res) => {
    const id = req.params.id
    const updatedDoc = req.body
    const result = await UpcomingMeal.findByIdAndUpdate({ _id: id }, {
        $set: {
            liked: updatedDoc.liked,
            likes: updatedDoc.likes
        }
    })
    res.send({ result, modifiedCount: 1 })

})

router.delete("/upcoming-meals/:id", async (req, res) => {
    const id = req.params.id
    const result = await UpcomingMeal.findOneAndDelete({ _id: id })
    res.send({ result, deletedCount: 1 })
})














module.exports = router