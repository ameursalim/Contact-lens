require("dotenv").config();
const lens = require("../models/Lens");
const mongoose = require("mongoose");

const lenses = [{
		img:"https://res.cloudinary.com/des8h9eva/image/upload/v1601560674/lens/vblwvw9oqzqxbx7yjsiu.jpg",
        brand:"Acuvue",
        reference:"#1233434",
        description:"They give you a very acute view"
	},
	{
		img:"https://res.cloudinary.com/des8h9eva/image/upload/v1601560848/lens/v9gy4f2yi50n61ii6ubl.jpg",
        brand:"Dailies",
        reference:"#MV2344",
        description:"Give us this day our daily lens"
	},
	{
		img:"https://res.cloudinary.com/des8h9eva/image/upload/v1601560938/lens/g2jzr4at1t1yfnlzc7ak.jpg",
        brand:"Air",
        reference:"#44544",
        description:"So light."
	}
 
];

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        lens.create(lenses)
            .then((dbResult) => {
                console.log(dbResult);
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        console.log(error);
    });