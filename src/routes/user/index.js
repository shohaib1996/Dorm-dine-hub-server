const express = require("express");
const User = require("../../model/User")
const router = express.Router()

router.post("/users", async(req, res) => {
    const user = req.body
    const newUser = new User(user)
    const savedUser = await newUser.save()
    res.send(savedUser)
})
router.get("/users", async(req, res) => {
    let query = {};
    if (req.query.email) {
        query = { email: req.query.email };
    }
    const result = await User.find(query)
    res.send(result)
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









module.exports = router