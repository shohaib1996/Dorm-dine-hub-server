const express = require("express");
const Review = require("../../model/Review")
const router = express.Router()

router.post("/reviews", async (req, res) => {
    const review = req.body
    const newReview = new Review(review)
    const result = await newReview.save()
    res.send({ result, insertedId: result._id })
})
router.get("/reviews", async (req, res) => {
    let query = {}
    if (req.query.id) {
        query = { food_id: req.query.id }
    }
    if (req.query.email) {
        query = { email: req.query.email }
    }
    // const result = await Review.find(query)
    const count = await Review.countDocuments(query)
    const pageNumber = parseInt(req.query.page) || 0;
    const perPage = 10
    const skip = parseFloat(pageNumber * perPage)
    const result = await Review.aggregate([
        { $match: query },
        { $skip: skip },
        { $limit: perPage },
    ])
    res.send({ data: result, count })
})
router.put("/reviews/:id", async (req, res) => {
    const id = req.params.id;
    const updatedKey = req.body
    const result = await Review.findByIdAndUpdate({ _id: id }, {
        $set: {
            comment: updatedKey.comment,
            user_rating: updatedKey.user_rating
        }
    })
    res.send({ result, modifiedCount: 1 });
})

router.delete("/reviews/:id", async (req, res) => {
    const id = req.params.id
    const result = await Review.findOneAndDelete({ _id: id })
    res.send({ result, deletedCount: 1 })
})


module.exports = router