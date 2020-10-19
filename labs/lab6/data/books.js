const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
const verify = require('./validation');

let { ObjectId } = require('mongodb');
/* Book Schema:
    { 
        _id: ObjectId generated by MongoDB,
        title: "book title",
        author: {authorFirstName: "first name", authorLastName: "last name"},
        genre: ["genre1", "genre2"], //array of genres, there must be at least one genre
        datePublished: Date field,
        summary: "Book summary...",
        reviews: [] //array of all the review ids for this book  
    }

    { 
        _id: ObjectId("bd8fa389-3a7a-4478-8845-e36a02de1b7b"),
        title: "The Shining",
        author: {authorFirstName: "Stephen", authorLastName: "King"},
        genre: ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
        datePublished: "1/28/1977",
        summary: "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..",
        reviews: ["fd8fa389-3a7a-4478-8845-e36a02de1b2a7"] //array of all the review ids for this book
    }
*/

let exportedMethods = {
    async getAllBooks() {
        const bookCollection = await books();
        const allBooks = await bookCollection.find({}, {projection: {_id: 1, title: 1}}).toArray();
        return allBooks.map(verify.convertId);
    },

    async getBookById(id) {
        if (!verify.validString(id)) throw 'Id must be a non-empty string';
        let objId = ObjectId(id.trim());
        const bookCollection = await books();
        const book = await bookCollection.findOne({_id: objId});
        if (!book) throw 'No book found with that Id';
        return verify.convertId(book);
    },

    async addBook(title, author, genre, datePublished, summary) {
        // Verify title argument
        if (!verify.validString(title)) throw 'Title is not a valid string';
        // Validate author argument
        if (!author || typeof author !== 'object' || !('authorFirstName' in author) || !('authorLastName' in author) || !verify.validString(author.authorFirstName) || !verify.validString(author.authorLastName)) throw 'Author is not valid';
        // Validate genre
        if (!genre || !Array.isArray(genre)) throw 'Genre is not an array';
        if (!verify.validGenre(genre)) throw 'Genre is not a valid array of strings';
        // Validate datePublished argument
        if (!verify.validDate(datePublished)) throw 'Date published is not a valid date string';
        // Validate summary
        if (!verify.validString(summary)) throw 'Summary is not a valid string';

        const newBook = {
            title: title.trim(),
            author: author,
            genre: genre,
            datePublished: datePublished.trim(),
            summary: summary.trim(),
            reviews: []
        };
        const bookCollection = await books();
        const insertInfo = await bookCollection.insertOne(newBook);
        if (insertInfo.insertedCount == 0) throw 'Could not add new book';
        const id = insertInfo.insertedId.toString();
        return await this.getBookById(id);
    },

    async updateBook(id, updatedBook) {
        if (!verify.validString(id)) throw 'Id is not a valid string';
        let objId = ObjectId(id.trim());
        
        const updateBookData = {};
        if (updatedBook.title) {
            if (!verify.validString(updatedBook.title)) throw 'Title is not a valid string';
            updateBookData.title = updatedBook.title;
        }
        if (updatedBook.author) {
            let author = updatedBook.author;
            if (typeof author !== 'object' || !author.authorFirstName || !author.authorLastName || !verify.validString(author.authorFirstName) || !verify.validString(author.authorLastName)) throw 'Author is not valid';
            updateBookData.author = author;
        }
        if (updatedBook.genre) {
            if (!verify.validGenre(updatedBook.genre)) throw 'Genre is not a valid array of strings';
            updateBookData.genre = updatedBook.genre;
        }
        if (updatedBook.datePublished) {
            if (!verify.validDate(updatedBook.datePublished)) throw 'Date published is not a valid date string';
            updateBookData.datePublished = updatedBook.datePublished;
        }
        
        if (updatedBook.summary) {
            if (!verify.validString(updatedBook.summary)) throw 'Summary is not a valid string';
            updateBookData.summary = updatedBook.summary;
        }

        const bookCollection = await books();
        const updateInfo = await bookCollection.updateOne({ _id: objId }, { $set: updateBookData });
        if (!updateInfo.matchedCount || !updateInfo.modifiedCount) throw 'Failed to update book';
        return await this.getBookById(id);
    },

    async removeBook(id) {
        if (!verify.validString(id)) throw 'Id is not a valid string';
        let objId = ObjectId(id.trim());
        const bookCollection = await books();
        const deleteInfo = await bookCollection.deleteOne({_id: objId});
        if (deleteInfo.deletedCount == 0) throw `Failed to delete movie with id=${id}`;
        return true;
    },

    async addReviewToBook(bookId, newReviewId) {
        if (!verify.validString(bookId)) throw 'Book id is not a valid string';
        if (!verify.validString(newReviewId)) throw 'Review id is not a valid string';
        let bookObjId = ObjectId(bookId.trim());
        const bookCollection = await books();
        const updateInfo = bookCollection.updateOne({ _id: bookObjId }, { $push: { reviews: newReviewId } });
        if (updateInfo.modifiedCount === 0) throw 'New review could not be added';
        return true;
    },

    async removeReviewFromBook(bookId, reviewId) {
        if (!verify.validString(bookId)) throw 'Book id is not a valid string';
        if (!verify.validString(reviewId)) throw 'Review id is not a valid string';
        let bookObjId = ObjectId(bookId.trim());
        const bookCollection = await books();
        const updateInfo = bookCollection.updateOne({_id: bookObjId}, { $pull: { reviews: reviewId} } );
        if (!updateInfo.modifiedCount === 0) throw 'Review could not be removed';
        return true;
    }
};

module.exports = exportedMethods;