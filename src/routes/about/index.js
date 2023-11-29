const express = require("express");
const AboutSchema = require('../../model/About')
const router = express.Router()


router.post('/about', async(req, res) => {
    const userInfo = req.body
    const newInfo = new AboutSchema(userInfo)
    const result = await newInfo.save()
    res.send({result, insertedId: result._id})
})

router.get('/about', async(req, res) => {
    const {email} = req.query
    let query = {}
    if(email){
        query = {email: email}
    }
    const result = await AboutSchema.find(query)
    res.send(result)
})

router.put("/about/:id", async (req, res) => {
    const id = req.params.id;
    const updatedKey = req.body
    const result = await AboutSchema.findByIdAndUpdate({ _id: id }, {
        $set: {
            hobby: updatedKey.hobby,
            pet: updatedKey.pet,
            address: updatedKey.address,
            education: updatedKey.education
        }
    })
    res.send({ result, modifiedCount: 1 });
})










module.exports = router