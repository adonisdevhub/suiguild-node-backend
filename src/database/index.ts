import mongoose from "mongoose";
import { db } from "../config";

// Build the connection string
const dbURI = `mongodb+srv://${db.user}:${db.password}@cluster0.wsblbwh.mongodb.net/`;
const options = {
  autoIndex: true,
  minPoolSize: db.minPoolSize, // Maintain up to x socket connections
  maxPoolSize: db.maxPoolSize, // Maintain up to x socket connections
  connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

mongoose.set("strictQuery", true);

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    console.log("Mongoose connection done");
  })
  .catch((e) => {
    console.log("Mongoose connection error");
    console.log(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open to " + dbURI);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

export const connection = mongoose.connection;
