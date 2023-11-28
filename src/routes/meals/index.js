const express = require("express");
const Meal = require('../../model/Meal')
const router = express.Router()



router.post("/meals", async (req, res) => {
    const mealData = req.body
    const newMealData = new Meal(mealData)
    const result = await newMealData.save()
    res.send({ result, insertedId: result._id })
})

router.get("/meals", async (req, res) => {
    const { search, category, sort, admin } = req.query
    // console.log(sort);
    let query = {};
    if (search) {
        query = { mealTitle: { $regex: new RegExp(search, 'i') } };
    }
    if (category) {
        query = { mealType: { $regex: new RegExp(category, 'i') } };
    }
    if (admin) {
        query = { admin_Email: { $regex: new RegExp(admin, 'i') } };
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
    // const pageNumber = parseInt(page) || 0;
    // const perPage = 10;
    // const skip = pageNumber * perPage;
    //.skip(skip).limit(perPage)
    const result = await Meal.find(query, null, options);

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
            mealTitle: updatedKey.mealTitle,
            mealType: updatedKey.mealType,
            ingredients: updatedKey.ingredients,
            mealImage: updatedKey.mealImage,
            description: updatedKey.description,
            price: updatedKey.price,
            rating: updatedKey.rating,
            timeDate: updatedKey.timeDate,
            liked: updatedKey.liked,
            likes: updatedKey.likes
        }
    })
    res.send({ result, modifiedCount: 1 });
})
router.patch("/meals/:id", async (req, res) => {
    const id = req.params.id
    const updatedData = req.body
    const result = await Meal.findByIdAndUpdate({ _id: id }, {
        $set: {
            reviews: updatedData.reviews,
            rating: updatedData.rating
        }
    })
    res.send({ result, modifiedCount: 1 });
})
router.delete("/meals/:id", async (req, res) => {
    const id = req.params.id
    const result = await Meal.findOneAndDelete({ _id: id })
    res.send({ result, deletedCount: 1 })
})



module.exports = router