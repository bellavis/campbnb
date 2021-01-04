const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/campbnb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const ranPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5ff05dcf05ecab45e0cb5949',
            price: ranPrice,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
               url: 'https://res.cloudinary.com/dmekt7cps/image/upload/v1609694759/Campbnb/g2zwyxf35hmyn6y7d6xh.jpg',
               filename: 'Campbnb/g2zwyxf35hmyn6y7d6xh'
                },
               {
                url: 'https://res.cloudinary.com/dmekt7cps/image/upload/v1609694760/Campbnb/mrfkqpt3zvd7go0cdltt.jpg',
                filename:'Campbnb/mrfkqpt3zvd7go0cdltt'
               }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque facere iure quibusdam cupiditate inventore, nihil necessitatibus itaque placeat optio magni illo tempora eum expedita odit quod quos laudantium facilis asperiores!',
        })
        await camp.save();
    }
}

seedDB().then((() => {
    mongoose.connection.close();
}))