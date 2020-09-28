require("dotenv").config();
const user = require("../models/User");
const mongoose = require("mongoose");

const users = [{
			img:"jn",
			brand:"nkn"
	},
    {
		img:"jn",
		brand:"nkn"
	},
];

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        user.create(users)
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