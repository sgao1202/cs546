const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const bookData = require('./books');
const verify = require('./validation');

let { ObjectId } = require('mongodb');

let exportedMethods = {
    async getAllReviews(bookId) {
        if (!verify.validString(bookId)) throw 'Invalid book id string';
        const reviewCollection = await reviews();
        const reviewsForBook = await reviewCollection.find({bookBeingReviewed: bookId}).toArray();
        return reviewsForBook.map(verify.convertId);
    },

    async getReviewById(id) {
        if (!verify.validString(id)) throw 'Invalid review id string';
        let objId = ObjectId(id.trim());
        const reviewCollection = await reviews();
        const review = await reviewCollection.findOne({_id: objId});
        if (!review) throw 'No review found with that Id';
        return verify.convertId(review);
    },

    async addReview(title, reviewer, bookBeingReviwed, rating, dateOfReview, review) {
        if (!verify.validString(title)) throw 'Invalid review title';
        if (!verify.validString(reviewer)) throw 'Invalid reviewer';
        if (!verify.validString(bookBeingReviwed)) throw 'Invalid book being reviewed';
        if (!verify.validRating(rating)) throw 'Invalid review rating';
        if (!verify.validDate(dateOfReview)) throw 'Invalid date of review';
        if (!verify.validString(review)) throw 'Invalid review';

        let newReview = {
            title: title.trim(),
            reviewer: reviewer.trim(),
            bookBeingReviewed: bookBeingReviwed,
            rating: rating,
            dateOfReview: dateOfReview.trim(),
            review: review.trim()
        }
        const reviewCollection = await reviews();
        const insertInfo = await reviewCollection.insertOne(newReview);
        if (insertInfo.insertedCount === 0) throw 'Could not add new review';
        const id = insertInfo.insertedId.toString();
        await bookData.addReviewToBook(bookBeingReviwed, id);
        return await this.getReviewById(id);
    },

    async deleteReview(reviewId) {
        if (!verify.validString(reviewId)) throw 'Invalid review id string';
        let objId = ObjectId(reviewId.trim());
        const reviewCollection = await reviews();
        const { bookBeingReviewed } = await this.getReviewById(reviewId);
        const deleteInfo = await reviewCollection.deleteOne({_id: objId});
        if (deleteInfo.deletedCount === 0) throw `Could not delete review with id=${id}`;
        await bookData.removeReviewFromBook(bookBeingReviewed, reviewId);
        return true;
    }
}

module.exports = exportedMethods;