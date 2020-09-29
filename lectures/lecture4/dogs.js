const mongoCollections = require('./mongoCollections');
const dogs = mongoCollections.dogs;

module.exports = {
    async getDogById(id) {
        if (!id) throw 'You must supply an ID';
        const dogCollection = await dogs();
        const doggo = await dogCollection.findOne({_id: id});
        if (!doggo) throw 'No dog found with that ID';
        return doggo;
    }, 

    async addDog(name, breeds) {
        if (!name) throw 'You must supply a name';
        if (!breeds || !Array.isArray(breeds)) throw 'Breeds must supplied and must be an array';
        if (breeds.length == 0) throw 'You need to supply at least one dog';

        const dogCollection = await dogs();
        const newDog = {
            name: name,
            breeds: breeds
        };

        const insertInfo = await dogCollection.insertOne(newDog);
        if (insertInfo.insertedCount === 0) throw 'Could not add dog';

        const newId = insertInfo.insertedId;
        const dog = await this.getDogById(newId);
        return dog;
    },

    async getAllDogs() {
        const dogCollection = await dogs();
        const dogList = await dogCollection.find({}).toArray();
        return dogList;
    },

    async removeDog(id) {
        if (!id) throw "You must supply an ID";
        const dogCollection = await dogs();
        const deleteInfo = await dogCollection.deleteOne({_id:id});
        if (deleteInfo.deletedCount === 0) throw 'Could not delete dog';
        return {deleted: true}; 
    },

    async updateDog(id, name, breeds) {
        if (!id) throw "You must supply an ID";
        if (!name) throw 'You must supply a name';
        if (!breeds || !Array.isArray(breeds)) throw 'Breeds must supplied and must be an array';
        if (breeds.length == 0) throw 'You need to supply at least one dog';

        const dogCollection = await dogs();
        const updatedDog = {
            name: name,
            breeds: breeds
        };

        const updateInfo = await dogCollection.updateOne({_id: id}, {$set: updatedDog});
        if (updateInfo.modifiedCount === 0) throw 'Could not update dog';
        return await this.getDogById(id);
    }
};