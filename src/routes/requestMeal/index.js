const express = require("express");
const RequestMeal = require('../../model/RequestedMeal')
const router = express.Router()

router.post("/request-meals", async (req, res) => {
    const request_meals = req.body
    const newRequestMeal = new RequestMeal(request_meals)
    const result = await newRequestMeal.save()
    res.send({ result, insertedId: result._id })
})
router.get("/request-meals", async (req, res) => {
   
    const {username, email} = req.query
    // console.log(email);
    let query = {};
    if (email) {
        query = { user_email: { $regex: new RegExp(email, 'i') } };
    }
    if(username){
        query = { user_name: { $regex: new RegExp(username, 'i') } };
    }
    const pageNumber = parseInt(req.query.page) || 0;
    const perPage = 10
    const skip = parseFloat(pageNumber * perPage)
    const count = await RequestMeal.countDocuments(query);
    const result = await RequestMeal.aggregate([
        { $match: query },
        { $sort: { status: -1 } },
        { $skip: skip },
        { $limit: perPage },
    ]);

    res.send({data: result, count})
})
router.patch('/request-meals/:id', async(req, res) => {
    const id = req.params.id
    const updatedMeal = req.body
    const result = await RequestMeal.findByIdAndUpdate({_id: id}, {
        $set: {
            status: updatedMeal.status
        }
    })
    res.send({result, modifiedCount: 1})

})


// router.get("/request-meals/:email", async (req, res) => {
//     const email = req.params.email
//     const query = { user_email: email }
//     const result = await RequestMeal.find(query)
//     const count = await RequestMeal.countDocuments(query);

//     res.send({ data: result, count });
// })


module.exports = router