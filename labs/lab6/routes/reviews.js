const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const bookData = data.books;

const verify = require('../data/validation');

router.get('/:bookId', async (req, res) => {
    let bookId = req.params.bookId;
    if (!verify.validString(bookId)) {
        res.status(400).json({error: 'No book id supplied'});
        return;
    }
    try {
        await bookData.getBookById(bookId);
    } catch (e) {
        res.status(404).json({error: 'Book does not exist'});
        return
    }

    try {
        const reviews = await reviewData.getAllReviews(bookId);
        if (reviews.length === 0) {
            res.status(404).json({error: `No reviews for book id=${bookId}`});
            return;
        }
        res.json(reviews);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.post('/:bookId', async (req, res) => {
    let reviewInfo = req.body;
    if (!reviewInfo.title || !reviewInfo.reviewer || !reviewInfo.bookBeingReviewed || !reviewInfo.rating || !reviewInfo.dateOfReview || !reviewInfo.review) {
        res.status(400).json({error: 'You must provide all fields (6 total)'});
        return;
    }

    // Validate input
    if (!verify.validString(reviewInfo.title)) {
        res.status(400).json({error: 'Invalid review title'});
        return;
    }
    if (!verify.validString(reviewInfo.reviewer)) {
        res.status(400).json({error: 'Invalid review reviewer'});
        return;
    }
    if (!verify.validString(reviewInfo.bookBeingReviewed)) {
        res.status(400).json({error: 'Invalid book being reviewed'});
        return;
    }

    let book = undefined;
    try {
        book = await bookData.getBookById(reviewInfo.bookBeingReviewed);
    } catch (e) {
        res.status(400).json({error: 'Invalid book id'});
        return;
    }

    if (!verify.validRating(reviewInfo.rating)) {
        res.status(400).json({error: 'Invalid review rating'});
        return;
    }
    if (!verify.validDate(reviewInfo.dateOfReview || verify.compareDates(reviewInfo.review, book.datePublished)) > 0) {
        res.status(400).json({error: 'Invalid review date'});
        return;
    }
    if(!verify.validString(reviewInfo.review)) {
        res.status(400).json({error: 'Invalid review'});
        return;
    }

    try {
        const newReview = await reviewData.addReview(reviewInfo.title, reviewInfo.reviewer, reviewInfo.bookBeingReviewed, reviewInfo.rating, reviewInfo.dateOfReview, reviewInfo.review);
        res.json(newReview);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({error: e});
    }
});

router.get('/:bookId/:reviewId', async (req, res) => {
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;
    if (!bookId || !reviewId) {
        res.status(400).json({error: 'Must supply both book id and review id'});
        return;
    }

    try {
        await bookData.getBookById(bookId);
    } catch (e) {
        res.status(404).json({error: 'Book does not exist'});
        return;
    }

    try {
        const review = await reviewData.getReviewById(reviewId);
        res.json(review);
    } catch (e) {
        res.status(404).json({error: 'Review not found'});
        return;
    }
});

router.delete('/:bookId/:reviewId', async (req, res) => {
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;
    if (!bookId || !reviewId) {
        res.status(400).json({error: 'Must supply both book id and review id'});
        return;
    }

    try {
        await bookData.getBookById(bookId);
    } catch (e) {
        res.status(404).json({error: 'Book does not exist'});
        return;
    }

    try {
        await reviewData.getReviewById(reviewId);
    } catch (e) {
        res.status(404).json({error: 'Review does not exist'});
        return;
    }
    try {
        await reviewData.deleteReview(reviewId);
        res.json({reviewId: reviewId, deleted: true});
    } catch (e) {
        console.log(e.message);
        res.status(500).json({error: e});
    }
});
module.exports = router;