const { Schema, default: mongoose} = require("mongoose");

const RequestMealSchema =  new Schema({
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
      },
      status: {
        type: String,
        required: true
      },
      user_email: {
        type: String,
        required: true
      },
      user_name: {
        type: String,
        required: true
      }

})
const RequestMeal = mongoose.model('requestMeal', RequestMealSchema)
module.exports = RequestMeal