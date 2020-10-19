const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const books = data.books;
const reviews = data.reviews

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    const book1 = {
        title: "The Shining",
        author: {authorFirstName: "Simon", authorLastName: "Gao"},
        genre: ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
        datePublished: "1/28/1977",
        summary: "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..",
    };

    const book2 = {
        title: "The Shining 2",
        author: {authorFirstName: "Simon", authorLastName: "Gao"},
        genre: ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
        datePublished: "1/28/2020",
        summary: "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..",
    };

    const book3 = {
        title: "Percy Jack & the Olympians",
        author: {authorFirstName: "Rick", authorLastName: "Riordan"},
        genre: ["Novel", "Greek mythology", "Fantasy", "Adventure"],
        datePublished: "1/28/2020",
        summary: "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..",
    };

    const book4 = {
        title: "Give or Take",
        author: {authorFirstName: "Adam", authorLastName: "Grant"},
        genre: ["Motivation", "Psychology", "Non-fiction"],
        datePublished: "4/9/2013",
        summary: "For generations, we have focused on the individual drivers of success: passion, hard work, talent, and luck. But in today’s dramatically reconfigured world, success is increasingly dependent on how we interact with others. In Give and Take, Adam Grant, an award-winning researcher and Wharton’s highest-rated professor, examines the surprising forces that shape why some people rise to the top of the success ladder while others sink to the bottom. Praised by social scientists, business theorists, and corporate leaders, Give and Take opens up an approach to work, interactions, and productivity that is nothing short of revolutionary."
    };

    const book5 = {
        title: "Option B",
        author: {authorFirstName: "Sheryl", authorLastName: "Sandberg"},
        genre: ["Non-fiction", "Grief & Bereavement", "Love & Loss"],
        datePublished: "4/24/2017",
        summary: "In 2015 Sheryl Sandberg’s husband, Dave Goldberg, died suddenly at the age of forty-eight. Sandberg and her two young children were devastated, and she was certain that their lives would never have..."
    };

    const book6 = {
        title: "Drive",
        author: {authorFirstName: "Daniel", authorLastName: "Pink"},
        genre: ["Non-fiction", "Motivational", "Psychology"],
        datePublished: "4/5/2011",
        summary: "Most people believe that the best way to motivate is with rewards like money—the carrot-and-stick approach. That's a mistake, says Daniel H. Pink (author of To Sell Is Human: The Surprising Truth About Motivating Others). In this provocative and persuasive new book, he asserts that the secret to high performance and satisfaction-at work, at school, and at home—is the deeply human need to direct our own lives, to learn and create new things, and to do better by ourselves and our world. Drawing on four decades of scientific research on human motivation, Pink exposes the mismatch between what science knows and what business does—and how that affects every aspect of life. He examines the three elements of true motivation—autonomy, mastery, and purpose-and offers smart and surprising techniques for putting these into action in a unique book that will change how we think and transform how we live."
    };

    const book7 = {
        title: "The Intelligent Investor",
        author: {authorFirstName: "Benjamin", authorLastName: "Graham"},
        genre: ["Non-fiction", "Finance", "Academic"],
        datePublished: "1/1/2003",
        summary: "This classic text is annotated to update Graham's timeless wisdom for today's market conditions...The greatest investment advisor of the twentieth century, Benjamin Graham, taught and inspired people worldwide. Graham's philosophy of 'value investing' -- which shields investors from substantial error and teaches them to develop long-term strategies -- has made The Intelligent Investor the stock market bible ever since its original publication in 1949. Over the years, market developments have proven the wisdom of Graham's strategies. While preserving the integrity of Graham's original text, this revised edition includes updated commentary by noted financial journalist Jason Zweig, whose perspective incorporates the realities of today's market, draws parallels between Graham's examples and today's financial headlines, and gives readers a more thorough understanding of how to apply Graham's principles. Vital and indispensable, this HarperBusiness Essentials edition of The Intelligent Investor is the most important book you will ever read on how to reach your financial goals."
    };

    const book8 = {
        title: "Price and Value",
        author: {authorFirstName: "George", authorLastName: "Calhoun"},
        genre: ["Non-fiction", "Business & Finance", "Academic", "Valuation"],
        datePublished: "2/3/2020",
        summary: "Understand how to use equity market metrics such as the price/earnings ratio (and other multiples) to value public and private enterprises. This essential book gives you the tools you need to identify and qualify investments and assess business strategy and performance. Author George Calhoun, Founding Director of the Quantitative Finance Program at Stevens Institute of Technology, shows you how to use metrics to appraise mergers, acquisitions, and spin-offs. You will be able to shed light on financial market conditions, benchmark fair value assessments, and check and calibrate complex cash flow models. Market multiples share a peculiar construction: they are based on an explicit apples-to-oranges comparison of market prices with accounting fundamentals, combining data derived from two very different sources and methodologies. This creates ambiguities in interpretation that can complicate the application of these metrics for the many purposes. Multiples are thus easy to construct, but they can be difficult to interpret. The meanings of certain multiples have evolved over time, and new-and-improved versions have been introduced. The field is becoming more complex and the question of which metrics perform best can be a source of controversy."
    };

    const book9 = {
        title: "My Sad Ass Auto-Biography",
        author: {authorFirstName: "Simon ", authorLastName: "Gao"},
        genre: ["Auto-Biography", "Sad", "Thoughts"],
        datePublished: "10/19/20",
        summary: "Wrote in a thoughts journal for the first time and it was really nice. The cause for it wasn't so nice, but putting your thoughts down in writing constitutes a relieving feeling"
    };

    const book10 = {
        title: "Scrapbook",
        author: {authorFirstName: "Simon", authorLastName: "Gao"},
        genre: ["Scrapbook", "Photography", "Memories", "Non-fiction"],
        datePublished: "12/2/2018",
        summary: "Scrapbook containing pictures from the better part of the last 3 years"
    }

    const review1 = {
        title: "This book scared me to death!!",
        reviewer: "scaredycat",
        bookBeingReviewed: "",
        rating: 5,
        dateOfReview: "10/7/2020",
        review: "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best work!"
    }

    const review2 = {
        title: "Oof what a bad book",
        reviewer: "Tedii",
        bookBeingReviewed: "",
        rating: 1,
        dateOfReview: "10/7/2020",
        review: "This book sucks"
    }
    
    const review3 = {
        title: "Adam Grant writes another master piece",
        reviewer: "Lycorist",
        bookBeingReviewed: "",
        rating: 5,
        dateOfReview: "10/19/2020",
        review: "Give and Take is a phenomenal book! I would highly recommend others to read it!"
    }

    const review4 = {
        title: "Adam Grant writes another master piece (jk)",
        reviewer: "Me",
        bookBeingReviewed: "",
        rating: 1,
        dateOfReview: "10/18/2020",
        review: "Give and Take is an average book! Might not recommend it to others."
    }

    const review5 = {
        title: "Adam Grant writes a good piece!",
        reviewer: "Me2",
        bookBeingReviewed: "",
        rating: 5,
        dateOfReview: "9/18/2020",
        review: "Give and Take is a great book! Would highly recommend :D."
    }

    const review6 = {
        title: "The Intelligent Investor is a MUST READ",
        reviewer: "aFinanceStudent",
        bookBeingReviewed: "",
        rating: 5,
        dateOfReview: "10/1/2020",
        review: "The Intelligent Investor is a fantastic book! Would definitely recommend to anyone seeking to learn more about value investing"
    }

    const review7 = {
        title: "Calhoun has outdone himself again",
        reviewer: "CalhounStudent",
        bookBeingReviewed: "",
        rating: 5,
        dateOfReview: "10/2/2020",
        review: "Calhoun's 'Price and Value' book is a great introduction to understanding the financial markets and valuation metrics for potential investment plays"
    }

    const review8 = {
        title: "This was extremely sentimental",
        reviewer: "Happy Simon",
        bookBeingReviewed: "",
        rating: 5,
        dateOfReview: "2/10/2020",
        review: "If you want to cry you should look through the pictures and memories"
    }

    const review9 = {
        title: "Extremely sad auto-biography",
        reviewer: "Myself",
        bookBeingReviewed: "",
        rating: 4,
        dateOfReview: "10/9/2020",
        review: "Would read again WAHOOOO"
    };

    const review10 = {
        title: "Interesting book from Calhoun",
        reviewer: "calhounSkeptic",
        bookBeingReviewed: "",
        rating: 3,
        dateOfReview: "9/30/2020",
        review: "I am skeptic about the material within this book."
    };

    const review11 = {
        title: "The Intelligent Investor is so confusing!",
        reviewer: "aConfusedReader",
        bookBeingReviewed: "",
        rating: 2,
        dateOfReview: "1/30/2020",
        review: "The book is so confusing to read! There are so many different and complex topics. It's almost like reading in a different language!"
    };

    try {
        const newBook1 = await books.addBook(book1.title, book1.author, book1.genre, book1.datePublished, book1.summary);
        const newBook2 = await books.addBook(book2.title, book2.author, book2.genre, book2.datePublished, book2.summary);
        const newbook3 = await books.addBook(book3.title, book3.author, book3.genre, book3.datePublished, book3.summary);
        const newBook4 = await books.addBook(book4.title, book4.author, book4.genre, book4.datePublished, book4.summary);
        const newBook5 = await books.addBook(book5.title, book5.author, book5.genre, book5.datePublished, book5.summary);
        const newBook6 = await books.addBook(book6.title, book6.author, book6.genre, book6.datePublished, book6.summary);
        const newBook7 = await books.addBook(book7.title, book7.author, book7.genre, book7.datePublished, book7.summary);
        const newBook8 = await books.addBook(book8.title, book8.author, book8.genre, book8.datePublished, book8.summary);
        const newBook9 = await books.addBook(book9.title, book9.author, book9.genre, book9.datePublished, book9.summary);
        const newBook10 = await books.addBook(book10.title, book10.author, book10.genre, book10.datePublished, book10.summary);
        

        review1.bookBeingReviewed = newBook1._id;
        review2.bookBeingReviewed = newBook2._id;
        review3.bookBeingReviewed = newBook4._id;
        review4.bookBeingReviewed = newBook4._id;
        review5.bookBeingReviewed = newBook4._id;
        review6.bookBeingReviewed = newBook7._id;
        review7.bookBeingReviewed = newBook8._id;
        review8.bookBeingReviewed = newBook10._id;
        review9.bookBeingReviewed = newBook9._id;
        review10.bookBeingReviewed = newBook8._id;
        review11.bookBeingReviewed = newBook7._id;

        const newReview1 = await reviews.addReview(review1.title, review1.reviewer, review1.bookBeingReviewed, review1.rating, review1.dateOfReview, review1.review);
        const newReview2 = await reviews.addReview(review2.title, review2.reviewer, review2.bookBeingReviewed, review2.rating, review2.dateOfReview, review2.review);
        const newReview3 = await reviews.addReview(review3.title, review3.reviewer, review3.bookBeingReviewed, review3.rating, review3.dateOfReview, review3.review);
        const newReview4 = await reviews.addReview(review4.title, review4.reviewer, review4.bookBeingReviewed, review4.rating, review4.dateOfReview, review4.review);
        const newReview5 = await reviews.addReview(review5.title, review5.reviewer, review5.bookBeingReviewed, review5.rating, review5.dateOfReview, review5.review);
        const newReview6 = await reviews.addReview(review6.title, review6.reviewer, review6.bookBeingReviewed, review6.rating, review6.dateOfReview, review6.review);
        const newReview7 = await reviews.addReview(review7.title, review7.reviewer, review7.bookBeingReviewed, review7.rating, review7.dateOfReview, review7.review);
        const newReview8 = await reviews.addReview(review8.title, review8.reviewer, review8.bookBeingReviewed, review8.rating, review8.dateOfReview, review8.review);
        const newReview9 = await reviews.addReview(review9.title, review9.reviewer, review9.bookBeingReviewed, review9.rating, review9.dateOfReview, review9.review);
        const newReview10 = await reviews.addReview(review10.title, review10.reviewer, review10.bookBeingReviewed, review10.rating, review10.dateOfReview, review10.review);
        const newReview11 = await reviews.addReview(review11.title, review11.reviewer, review11.bookBeingReviewed, review11.rating, review11.dateOfReview, review11.review);
    } catch (e) {
        console.log(e);
        console.log("Error caught");
    }
    
    console.log('Done seeding database');
    await db.serverConfig.close();
}

main();