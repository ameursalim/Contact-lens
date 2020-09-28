require("dotenv").config();
const lens = require("../models/Lenses");
const mongoose = require("mongoose");

const lenses = [{
		img:"jn",
		brand:"nkn"
	},
    {
        title: 'The Strangers: Prey at Night',
        genre: 'drama',
        plot: 'a plot twist!'

    },
    {
        title: 'The Hurricane Heist',
        genre: 'horror',
        plot: 'i will not spoil'

    }
];

mongoose
    .connect(process.env.URI, {
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