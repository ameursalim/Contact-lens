require("dotenv").config();
const lens = require("../models/Lens");
const mongoose = require("mongoose");

const lenses = [{
		img:"jn",
		brand:"nkn"
	},
	{
		img:"btgrhn",
		brand:"rtrkn"
	},
	{
		img:"grfn",
		brand:"lknhbjn"
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