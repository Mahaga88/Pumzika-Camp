const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedsHelpers");
const Campground = require("../models/campground");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO DB CONNECTED SUCCESSFULLY");
  })
  .catch((err) => {
    console.log("ERROR CONNECTING TO MONGO DB");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random47 = Math.floor(Math.random() * 47);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER_ID
      author: "645ffa3d30be739164db007c",
      location: `${cities[random47].city}, ${cities[random47].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos magnam at alias eaque neque dolor inventore quod, deleniti eligendi tempora rerum voluptate, delectus perspiciatis sapiente nemo cum autem laboriosam.",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random47].longitude, cities[random47].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/foodorderproject/image/upload/v1688035694/YelpCamp/kzzerjeblmaj0tbxpurt.jpg",
          filename: "YelpCamp/kzzerjeblmaj0tbxpurt.jpg",
        },
        {
          url: "https://res.cloudinary.com/foodorderproject/image/upload/v1687981314/YelpCamp/tommy-lisbin-2DH-qMX6M4E-unsplash_zhmpyt.jpg",
          filename: "YelpCamp/tommy-lisbin-2DH-qMX6M4E-unsplash_zhmpyt.jpg",
        },
        {
          url: "https://res.cloudinary.com/foodorderproject/image/upload/v1688307531/YelpCamp/smiley-woman-camping-outdoors-with-tent_23-2148704436_ykjuv3.jpg",
          filename:
            "YelpCamp/miley-woman-camping-outdoors-with-tent_23-2148704436_ykjuv3.jpg",
        },
        {
          url: "https://res.cloudinary.com/foodorderproject/image/upload/v1688306886/YelpCamp/istockphoto-941906052-612x612_pnkye8.jpg",
          filename: "YelpCamp/istockphoto-941906052-612x612_pnkye8.jpg",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  // mongoose.connection.close();
});
