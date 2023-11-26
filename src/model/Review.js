const { Schema, default: mongoose} = require("mongoose");

const ReviewSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    mealTitle: { type: String, required: true },
    likes: { type: Number, required: true },
    reviews: { type: Number, required: true },
    comment: { type: String, required: true },
    user_rating: { type: Number, required: true },
    food_id: { type: String, required: true },
    image: { type: String, required: true },
})

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;

