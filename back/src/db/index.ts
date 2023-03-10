import mongoose from "mongoose"

import dotenv from 'dotenv'
// dotenv.config({ path: '../.env' })
dotenv.config()


const MONGO_URI:string = process.env.MONGODB_URI 
console.log('MONGODB_URI : ',MONGO_URI)

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


