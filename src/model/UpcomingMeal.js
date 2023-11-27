const { Schema, default: mongoose} = require("mongoose");

const UpcomingMealSchema = new Schema({
    mealTitle: {
        type: String,
        required: true
      },
      mealType: {
        type: String,
        required: true
      },
      mealImage: {
        type: String,
        required: true
      },
      ingredients: {
        type: Array,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      timeDate: {
        type: Date,
        required: true
      },
      likes: {
        type: Number,
        required: true
      },
      reviews: {
        type: Number,
        required: true
      },
      adminName: {
        type: String,
        required: true
      },
      admin_Email: {
        type: String,
        required: true
      },
      liked: {
        type: Boolean
      }
})

const UpcomingMeal = mongoose.model("UpcomingMeal", UpcomingMealSchema)
module.exports = UpcomingMeal