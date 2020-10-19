const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;
const reviewData = data.reviews;

const verify = require('../data/validation');

// Return an array of all books with only the _id and title keys
router.get('/', async (req, res) => {
    try {
        const allBooks = await bookData.getAllBooks();
        res.json(allBooks);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

// Get a specific book with id
router.get('/:id', async (req, res) => {
    let bookId = req.params.id.trim();
    try {
        const book = await bookData.getBookById(bookId);
        res.json(book);
    } catch (e) {
        res.status(404).json({error: 'Book not found'});
    }
});

router.post('/', async (req, res) => {
    const newBookData = req.body;
    if (!verify.validString(newBookData.title)) {
        res.status(400).json({error: 'You must supply a valid book title'});
        return;
    }
    if (!newBookData.author || typeof newBookData.author !== 'object' || !newBookData.author.authorFirstName || !newBookData.author.authorLastName || typeof newBookData.author.authorFirstName !== 'string' || typeof newBookData.author.authorLastName !== 'string') {
        res.status(400).json({error: 'You must supply a book author with valid fields and names'});
        return;
    }
    if (!newBookData.genre || !Array.isArray(newBookData.genre) || newBookData.genre.length === 0) {
        res.status(400).json({error: 'You must supply an array of book genres'});
        return;
    }
    if (!verify.validString(newBookData.datePublished) || !verify.validDate(newBookData.datePublished)) {
        res.status(400).json({error: "You must supply a valid publishing date"});
        return;
    }
    if (!verify.validString(newBookData.summary)) {
        res.status(400).json({error: 'You must supply a book summary'});
        return;
    }
    // There must be a total of 5 keys if the request body passes all validation checks
    // If there are more than 5 then the request body does not follow the schema
    if (Object.keys(newBookData).length !== 5) {
        res.status(400).json({error: "Request body's schema does not match the book schema (only allows 5 keys)"});
        return;
    }

    try {
        const { title, author, genre, datePublished, summary } = newBookData;
        const newBook = await bookData.addBook(title, author, genre, datePublished, summary);
        res.json(newBook);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.put('/:id', async (req, res) => {
    let bookInfo = req.body;
    let bookId = req.params.id;
    if (!bookInfo.title || !bookInfo.author || !bookInfo.genre || !bookInfo.datePublished || !bookInfo.summary || Object.keys(bookInfo).length !== 5) {
        res.status(400).json({error: 'You must provide all fields (5 total)'});
        return;
    }

    // Validate input
    if (!verify.validString(bookInfo.title)) {
        res.status(400).json({error: 'Invalid book title'});
        return;
    }
    if (!bookInfo.author.authorFirstName || !verify.validString(bookInfo.author.authorFirstName) || !bookInfo.author.authorLastName || !verify.validString(bookInfo.author.authorLastName)) {
        res.status(400).json({error: 'Invalid book author'});
        return;
    }
    if (!verify.validGenre(bookInfo.genre)) {
        res.status(400).json({error: 'Invalid book genre'});
        return;
    }
    if (!verify.validDate(bookInfo.datePublished)) {
        res.status(400).json({error: 'Invalid book publishing date'});
        return;
    }
    if (!verify.validString(bookInfo.summary)) {
        res.status(400).json({error: 'Invalid book summary'});
        return;
    }

    // Check if the book exists
    try {
        const oldBook = await bookData.getBookById(bookId);
        bookInfo.reviews = oldBook.reviews;
    } catch (e) {
        res.status(404).json({error: 'Book not found'});
        return;
    }

    // Attempt to update the book
    try {
        const updateBook = await bookData.updateBook(bookId, bookInfo);
        res.json(updateBook);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.patch('/:id', async (req, res) => {
    const requestBody = req.body;
    if (Object.keys(requestBody) < 1) {
        res.status(400).json({error: 'You must supply at least one field'});
        return;
    }

    let updatedBook = {};
    try {
        const oldBook = await bookData.getBookById(req.params.id);
        if (requestBody.title && requestBody.title !== oldBook.title) {
            if (!verify.validString(requestBody.title)) {
                res.status(400).json({error: 'Invalid book title'});
                return;
            }
            updatedBook.title = requestBody.title;
        }
        if (requestBody.author) {
            let author =requestBody.author;
            if (typeof author !== 'object' || !verify.validString(author.authorFirstName) || !verify.validString(author.authorLastName)) {
                res.status(400).json({error: 'Invalid book author'});
                return;
            }
            updatedBook.author = {};
            if (author.authorFirstName !== oldBook.author.authorFirstName) {
                updatedBook.author.authorFirstName = author.authorFirstName
            }

            if (author.authorLastName !== oldBook.author.authorLastName) {
                updatedBook.author.authorLastName = author.authorLastName;
            }
        }
        if (requestBody.genre) {
            if (!Array.isArray(requestBody.genre)) {
                res.status(400).json({error: 'Invalid book genres'});
                return;
            }
            if (!verify.isEqual(oldBook.genre, requestBody.genre)) {
                let updatedGenres = oldBook.genre;
                for (const genre of requestBody.genre) {
                    if (!updatedGenres.includes(genre)) updatedGenres.push(genre);
                }
                updatedBook.genre = updatedGenres;
            }
        }
        if (requestBody.datePublished && requestBody.datePublished !== oldBook.datePublished) {
            if (!verify.validDate(requestBody.datePublished)) {
                res.status(400).json({error: 'Invalid book publishing date'});
                return;
            }
            updatedBook.datePublished = requestBody.datePublished;
        }
        if (requestBody.summary && requestBody.summary !== oldBook.summary) {
            if (!verify.validString(requestBody.summary)) {
                res.status(400).json({error: 'Invalid book summary'});
                return;
            }
            updatedBook.summary = requestBody.summary;
        }
    } catch (e) {
        console.log(e);
        res.status(404).json({error: 'Book not found'});
        return;
    }

    try {
        const updateBook = await bookData.updateBook(req.params.id, updatedBook);
        res.json(updateBook);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({error: e});
    }
});

router.delete('/:id', async (req, res) => {
    const bookId = req.params.id;
    if (!bookId) throw 'You must specify a book ID to delete';

    // Attempt to find the book in the database
    try {
        await bookData.getBookById(bookId);
    } catch (e) {
        res.status(404).json({error: "Book not found"});
        return;
    }

    // Attempt to delete the book from the database
    try {
        // Remove all reviews for book with bookId before deleting the actual book
        const allReviewsToDelete = await reviewData.getAllReviews(bookId);
        for (const currentReview of allReviewsToDelete) {
            await reviewData.deleteReview(currentReview._id);
        }
        await bookData.removeBook(bookId);
        res.json({bookId: bookId, deleted: true});
    } catch (e) {
        res.status(404).json({error: 'Could not delete book'});
    }
});

module.exports = router;