// Data.js
const mongoose = require("mongoose");

// Define schema for your objects
const dataSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, // Assuming id should be unique
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
