const express = require("express");
const User = require("../../model/User")
const verifyToken = require('../../middlewares/verifyToken')

const router = express.Router()

router.post("/users", async(req, res) => {
    const user = req.body
    const newUser = new User(user)
    const savedUser = await newUser.save()
    res.send(savedUser)
})
router.get("/users",verifyToken, async(req, res) => {
    const {username, email, role} = req.query
    console.log(email);
    let query = {};
    if (email) {
        query = { email: { $regex: new RegExp(email, 'i') } };
    }
    if(username){
        query = { name: { $regex: new RegExp(username, 'i') } };
    }
    if(role){
        query = { role: { $regex: new RegExp(role, 'i') } };
    }
    // const result = await User.find(query)
    
    const pageNumber = parseInt(req.query.page) || 0;
    const perPage = 10
    const skip = parseFloat(pageNumber * perPage)
    const count = await User.countDocuments(query)
    const result = await User.aggregate([
        { $match: query },
        { $skip: skip },
        { $limit: perPage },
    ])
    res.send({ data: result, count })
})
router.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const updatedKey = req.body
    const result = await User.findByIdAndUpdate({ _id: id }, {
        $set: {
            badge: updatedKey.badge,
            badge_image: updatedKey.badge_image
        }
    })
    res.send({result, modifiedCount: 1});
})

router.patch("/users/admin/:id", async(req, res) => {
    const id = req.params.id
    const updatedRole = req.body
    const result = await User.findByIdAndUpdate({_id: id}, {
        $set: {
            role: updatedRole.role
        }
    })
    res.send({result, modifiedCount: 1})
})










module.exports = router