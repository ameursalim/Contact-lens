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
        id_ContactLens:"5f71e18d5012573705280eb1",
        frequency:"daily",
        reminder:Date.now(),
        delivered:true,
        carteVital:"carte",
        mutuelle : "Cloudinary",
        ordonnance: "Cloudinary",

    },

    
	},
    
    {
        
        username: "baz",
        email:"baz@gmail.com",
        password:"1236456565",
        role:"admin",
        adresse:"22 rue GAMBETTA",
        telephone:065357376575,
        info: {
            id_ContactLens:"5f71e18d5012573705280eb1",
            frequency:"monthly",
            reminder: Date.now() ,
            delivered: false,
            carteVital:"carte",
            mutuelle : "Cloudinary",
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

//     username: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, enum: ["admin", "user"], default: "user" },
//     avatar: String,
//     adresse: String,
//     telephone: Number,
//     info: {
//       id_ContactLens: { type: Schema.Types.ObjectId, ref: "Lens" },
//       frequency : {enum :["daily","weekly","montly"]},
//       reminder : Date,
//       delivered : Boolean,
//       carteVital: String,
//       mutuelle : String,
//       ordonnance: String,
      
//   },
//   })