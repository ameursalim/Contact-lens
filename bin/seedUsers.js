require("dotenv").config();
const user = require("../models/User");
const mongoose = require("mongoose");

const users = [{
        
        username: "admin",
        email:"admin@gmail.com",
        password:"$2b$10$KcvbOgGEVjm9ncQpd0eIlObcfaSBPnvZtsNDZvj6AZ92Rf016KX3a",
        role:"admin",
        address:"22 rue GAMBETTA",
        telephone:"065357376575",
        info: {
            id_ContactLens:"5f75e1c49ceba215364ef95f",
            frequency:"monthly",
            reminder: Date.now() ,
            delivered: false,
            carteVitale:"182565286752637149863",
            mutuelle: "5524165434147916354342",
            ordonnance: "Cloudinary",
    
        },
    
        
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

