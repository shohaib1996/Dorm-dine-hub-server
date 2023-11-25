const express = require("express");
const Meal = require('../../model/Meal')
const router = express.Router()

router.get("/meals", async (req, res) => {
    const {search, category, sort} = req.query
    // console.log(sort);
    let query = {};
    if (search) {
        query = { mealTitle: { $regex: new RegExp(search, 'i') } };
    }
    if (category) {
        query = { mealType: { $regex: new RegExp(category, 'i') } };
    }
    const options = {};
    if (sort) {
        if (sort === 'lt10') {
            query.price = { $lt: 10 }
        } else if (sort === 'gt10') {
            query.price = { $gte: 10 };
        }
        options.sort = {
            price: sort === 'asc' ? 1 : -1
        };
    }
    const result = await Meal.find(query,null, options);

    res.send(result)
})
router.get("/meals/:id", async (req, res) => {
    const id = req.params.id;
    const service = await Meal.findById(id);
    res.send(service);
})
router.put("/meals/:id", async (req, res) => {
    const id = req.params.id;
    const updatedKey = req.body
    const result = await Meal.findByIdAndUpdate({ _id: id }, {
        $set: {
            liked: updatedKey.liked,
            likes: updatedKey.likes
        }
    })
    res.send({result, modifiedCount: 1});
})

module.exports = router