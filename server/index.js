const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const { challengeRoute } = require("./challenge.js");

app.use(express.json());
app.use(cors());

app.use("/challenges", challengeRoute);

mongoose.connect("mongodb+srv://harshinilara:lara@cluster0.w1huor8.mongodb.net/?retryWrites=true&w=majority",
 {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }
);

const db = mongoose.connection;

db.on('error', (err) => {
    console.log("Error connecting to database", err);
});
db.once('open', () => {
    console.log("Connected to database");
});

app.listen(3001, () => {
    console.log("Server running on port: 3001");
});
