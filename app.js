// app.js
const mongoose = require("mongoose");
const Data = require("./Data"); // Import your Mongoose model

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// CRUD Operations

// Create (Insert Data)
async function createData(newObj) {
  try {
    const exists = await Data.findOne({ id: newObj.id });
    if (!exists) {
      /**The Data in new Data(newObj) refers to the Mongoose model. You defined the Data model when you created the schema for your collection:
       * This model represents a collection in your MongoDB database (in this case, the data collection), and it uses the schema you defined for validation and structure.
        const Data = mongoose.model('Data', dataSchema);
        
       new Data(newObj) creates a new document based on the Data model and the provided newObj. The newObj is the object containing the data you want to insert into the database.
        */
      const newData = new Data(newObj);
      await newData.save();
      console.log("Data created:", newObj);
    } else {
      console.log("Duplicate id found:", newObj.id);
    }
  } catch (error) {
    console.error("Error creating data:", error);
  }
}

// Read All Data
async function readAllData() {
  try {
    const allData = await Data.find();
    console.log("All Data:", allData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Read Data by ID
async function readDataById(id) {
  try {
    const data = await Data.findOne({ id });
    if (data) {
      console.log("Data found:", data);
    } else {
      console.log("No data found for id:", id);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Update Data
async function updateData(id, updatedFields) {
  try {
    const updatedData = await Data.findOneAndUpdate({ id }, updatedFields, {
      new: true, // To return the updated document
    });
    if (updatedData) {
      console.log("Data updated:", updatedData);
    } else {
      console.log("No data found for id:", id);
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

// Delete Data
async function deleteData(id) {
  try {
    const deletedData = await Data.findOneAndDelete({ id });
    if (deletedData) {
      console.log("Data deleted:", deletedData);
    } else {
      console.log("No data found for id:", id);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

// Example Usage of CRUD Operations
async function runCRUDOperations() {
  await createData({ id: 1, name: "Jane", age: 29, occupation: "Architect" });
  await createData({ id: 2, name: "John", age: 34, occupation: "Engineer" });

  await readAllData();
  await readDataById(1);

  await updateData(1, { age: 30, occupation: "Senior Architect" });

  await deleteData(2);

  // Finally, read all data again to see the updates
  await readAllData();
}

// Run the CRUD operations
runCRUDOperations()
  .then(() => {
    mongoose.connection.close(); // Close the connection when done
  })
  .catch((err) => {
    console.error(err);
  });
