const mongoose = require('mongoose');

//This lines avoid using deprecated methods
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

const Dish = require('./models/dish');

const databaseLocation = 'mongodb://localhost:27017/conFusion';
const dbConnection = mongoose.connect(databaseLocation);


dbConnection.then((db) => {
    console.log("Connected correctly to MongoDB")

    Dish.create({
        name: 'Uthappizaa',
        description: 'This is a test value'
    })
        .then((dish) => {
            console.log(dish)
            return Dish.findByIdAndUpdate(dish._id, {
                $set: { description: "Updated test" }
            }, { new: true }).exec()
        })
        .then((dish) => {
            console.log(dish);
            dish.comment.push({
                rating: 5,
                comment: "Testing comment",
                author: "Juan Perazzo"
            })
            return dish.save()
        })
        .then((dish) => {
          console.log(dish)
          return Dish.deleteMany({})  
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((error) => {
            console.log(error);
        });

})