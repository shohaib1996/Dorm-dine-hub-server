const express = require('express');
const connectToDb = require('./db/connectToDb')
const applyMiddleware = require("./middlewares/applyMiddleware")
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

// routes

const mealsRoutes = require("./routes/meals/index")
const paymentRoutes = require("./routes/payment/index")
const userRoutes = require("./routes/user/index")
const requestedMealsRoutes = require("./routes/requestMeal/index")
const reviewsRoutes = require("./routes/reviews/index")
const upcomingRoutes = require("./routes/upcomingMeals/index")
const authenticationRoutes = require("./routes/authentication/index")



applyMiddleware(app)

app.use(mealsRoutes)
app.use(paymentRoutes)
app.use(userRoutes)
app.use(requestedMealsRoutes)
app.use(reviewsRoutes)
app.use(upcomingRoutes)
app.use(authenticationRoutes)


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