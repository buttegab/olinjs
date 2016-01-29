var fakeDatabase = module.exports = {

    data: [],

    add: function(obj) {
        //adds item to end of array holding data
        fakeDatabase.data.push(obj);
    },

    getAll: function() {
        //returns copy of array of all items in the database
        return fakeDatabase.data.slice();
    },

    remove: function(index) {
        //removes item located at index in array and returns it
        return fakeDatabase.data.splice(index,1);
        //return fakeDatabase.data.slice();
    }
}