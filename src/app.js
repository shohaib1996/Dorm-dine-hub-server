const express = require('express');
const connectToDb = require('./db/connectToDb')
const applyMiddleware = require("./middlewares/applyMiddleware")
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

// routes
const mealsRoutes = require("./routes/meals/index")



applyMiddleware(app)
app.use(mealsRoutes)


app.get("/health", (req, res) => {
    res.send("dormDineHub is running")
})

app.all("*", (req, res, next) => {
    const error = new Error(`the requested url is invalid: [${req.url}] `)
    error.status=404
    next(error)
    // console.log(req.url);
})
app.use((err, req, res, next)=> {
    res.status(err.status || 500).json({
        message: err.message
    })
})

const main = async() => {
    await connectToDb()
    app.listen(port, () => {
        console.log(`dormDineHub is running on port ${port}`)
    })
}

main()