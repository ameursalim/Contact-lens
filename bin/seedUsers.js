require("dotenv").config();
const user = require("../models/User");
const mongoose = require("mongoose");

const users = [{
        
    username: "FOO",
    email:"foo@gmail.com",
    password:"12345",
    role:"user",
    address:"22 rue victor hugo",
    telephone:06434564355,
    info: {
        id_ContactLens:"5f73148aab2379ebcae1454e",
        frequency:"daily",
        reminder:Date.now(),
        delivered:true,
        carteVitale:"1825652867463546",
        mutuelle : "2652456534635",
        ordonnance: "Cloudinary",

    },

    
	},
    
    {
        
        username: "baz",
        email:"baz@gmail.com",
        password:"1236456565",
        role:"admin",
        address:"22 rue GAMBETTA",
        telephone:065357376575,
        info: {
            id_ContactLens:"5f73148aab2379ebcae1454e",
            frequency:"monthly",
            reminder: Date.now() ,
            delivered: false,
            carteVitale:"182565286752637149863",
            mutuelle : "5524165434147916354342",
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

