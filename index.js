const mongoose = require('mongoose');

//This lines avoid using deprecated methods
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const Dish = require('./models/dish');

const databaseLocation = 'mongodb://localhost:27017/conFusion';
const dbConnection = mongoose.connect(databaseLocation);


dbConnection.then((db) => {
    console.log("Connected correctly to MongoDB")

    Dish.create({
        name: 'Uthappiza',
        description: 'This is a test value'
    })
        .then((dish) => {
            console.log(dish)
            return Dish.find({}).exec();
        })
        .then((dishes) => {
            console.log(dishes);
            return Dish.deleteMany({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((error) => {
            console.log(error);
        });

})