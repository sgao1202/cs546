const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;

let { ObjectId } = require('mongodb');

function validString(str) {
        if (!str || typeof str != 'string' || !str.trim()) return false;
        return true;
}

// Takes in a movie object and converts _id to a string
// Returns a movie object with _id value as a string
function convertId(movie) {
    movie._id = movie._id.toString();
    return movie;
}

module.exports = {
    async get(id) {
        if(!validString(id)) throw new Error('Id must be provided and must be a non-empty string');
        // Convert string id into ObjectId
        // If this fails then it will automatically throw an error
        let parsedId = ObjectId(id.trim());
        const movieCollection = await movies();
        const movie = await movieCollection.findOne({_id: parsedId});
        if (!movie) throw new Error('No movie found with that ID');
        return convertId(movie);
    },

    async create(title, plot, rating, runtime, genre, cast, info) {
        if (!validString(title)) throw new Error('Title must be provided and must be a string');
        if (!validString(plot)) throw new Error('Plot must be provided and must be a string');
        if (!validString(rating)) throw new Error('Rating must be provided and must be a string');
        if (!validString(runtime)) throw new Error('Runtime must be provided and must be a string');
        if (!validString(genre)) throw new Error('Genre must be provided and must be a string');

        if (!cast || !Array.isArray(cast) || cast.length == 0 || !cast.map(validString, cast).reduce((a,b) => a && b)) throw new Error('Cast must be provided and must be a non-empty array of strings');
        
        if (!info || typeof info != 'object') throw new Error('Info must be provided and must be an object');
        if (!info.director || !validString(info.director)) throw new Error('Director should be a key in info with a valid string as the value');
        if (!info.yearReleased || typeof info.yearReleased != 'number' || info.yearReleased.toString().length != 4) throw new Error ('Year released must be a key in info and should be a valid 4 digit number');
        let now = new Date();
        let currentYear = now.getFullYear();
        if (info.yearReleased < 1930 || info.yearReleased > currentYear + 5) throw new Error(`Year released should be greater than 1930 and less than or equal to ${currentYear + 5}`);

        const movieCollection = await movies();
        const newMovie = {
            title: title.trim(),
            plot: plot.trim(),
            rating: rating.trim(),
            runtime: runtime.trim(),
            genre: genre.trim(),
            cast: cast,
            info: info
        };
        
        const insertInfo = await movieCollection.insertOne(newMovie);
        if (insertInfo.insertedCount === 0) throw new Error('Could not add movie');
        const id = insertInfo.insertedId.toString()
        const movie = await this.get(id);
        // Convert _id, which is an ObjectId originally, to a string
        return movie;
    },

    async getAll() {
        const movieCollection = await movies();
        const allMovies = await movieCollection.find({}).toArray();

        // Change all _id values to strings
        return allMovies.map(convertId);
    },

    async remove(id) {
        if (!validString(id)) throw new Error('Id must be provided and must be a non-empty string');
        let parsedId = ObjectId(id.trim());
        const movieCollection = await movies();
        const { title } = await this.get(id);
        const deleteInfo = await movieCollection.deleteOne({_id: parsedId});
        if (deleteInfo.deletedCount === 0) throw new Error('Could not delete movie');
        return `${title} has been successfully deleted`;
    },

    async rename(id, newTitle) {
        if (!validString(id)) throw new Error('Id must be provided and must be a non-empty string');
        let id2 = id.trim();
        let parsedId = ObjectId(id2);

        if (!validString(newTitle)) throw new Error('New title is not valid');

        const movieCollection = await movies();
        const updatedMovie = await this.get(id2);
        updatedMovie.title = newTitle;
        updatedMovie._id = parsedId;

        const updateInfo = movieCollection.updateOne({_id: parsedId}, {$set: updatedMovie});
        if (updateInfo.modifiedCount === 0) throw new Error('Could not update movie');
        const newMovie = await this.get(id2);
        return newMovie;
    }
}