require("dotenv").config();
const lens = require("../models/Lens");
const mongoose = require("mongoose");

const lenses = [{
		img:"jn",
        brand:"nkn",
        reference:"1233434",
        description:"sqfdsdfsqdfqsdfsdf"
	},
	{
		img:"btgrhn",
        brand:"rtrkn",
        reference:"MV2344",
        description:"sqdfsdfgdf"
	},
	{
		img:"grfn",
        brand:"lknhbjn",
        reference:"Mrefae44544",
        description:"sqdfsdfgdf"
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