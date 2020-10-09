const movies = require('./data/movies');
const connection = require('./config/mongoConnecton');
const { getAll } = require('./data/movies');

async function main() {
        // Create 1st movie and log it
        const theDarkKnight = await movies.create(
            "The Dark Knight",
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "R",
            "2hr 32min",
            "Action",
            ["Christian Bale","Heath Ledger"],
            {director: "Christopher Nolan", yearReleased: 2008}
        );
        console.log(theDarkKnight);
        
        // Create 2nd movies
        const hiddenFigures = await movies.create(
            "Hidden Figures",
            "The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program.",
            "PG",
            "2hr 7min",
            "Drama",
            ["Taraji P. Henson","Octavia Spencer", "Janelle Monáe"],
            {director: "Theodore Melfi", yearReleased: 2016}
        );

        // Query all movies and log them all
        const allMovies = await movies.getAll();
        console.log(allMovies);

        // Create 3rd movie and log it
        const avengersEndgame = await movies.create(
            "Avengers: Endgame",
            "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.",
            "PG-13",
            "3hr 2min",
            "Action/Sci-fi",
            ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
            {director: "Russo Brothers", yearReleased: 2019}
        );
        console.log(avengersEndgame);
        
        // Rename 1st movie and log it
        const rename = await movies.rename(theDarkKnight._id, "The Dark Knight 2");
        console.log(rename);

        // Remove the 2nd movie
        const remove = await movies.remove(hiddenFigures._id);
        
        // Query all movies and log them
        const allMovies2 = await movies.getAll();
        console.log(allMovies2);

        // Try and create a movie with bad input parameters
        const badMovie = await movies.create(
            "Bad Movie",
            "    ",
            "",
            "R",
            "Drama",
            [],
            {hello: 'hi'}
        );

        // Try to remove a movie that does not exist to make sure it throws errors
        const removeError = await movies.remove('123231321');

        // Try to rename a movie that does not exist to make sure it throws errors.
        const renameError = await movies.rename(hiddenFigures._id, "Bad Data");

        // Try to rename a movie passing in invalid data for the parameter to make sure it throws errors.
        const renameError2 = await movies.rename(theDarkKnight._id, "");

        // Try getting a movie by ID that does not exist to make sure it throws errors.
        const getError = await movies.get(hiddenFigures._id);

        const db = await connection();
        await db.serverConfig.close();
}

main().catch(async (error) => {
    console.log(error);
    const db = await connection();
    await db.serverConfig.close();
});