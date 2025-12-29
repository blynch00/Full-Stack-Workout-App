import mongoose from 'mongoose';
import 'dotenv/config';

const MODEL_STRING = "exercises";
const DB_NAME = "exercise_db";
const COLLECTION_NAME = 'exercises';

// creates a connection to the MongoDB server, connecting to the specific database based on the name parameter.
async function connect(dropCollection){
    try{
        const connection = await createConnection();
        console.log("Successfully connected to MongoDB using Mongoose!");
        if(dropCollection){
            await connection.db.dropCollection(COLLECTION_NAME);
        }
    }
    catch(err){
        throw Error("Could not connect to MongoDB.");
    }
}

// Create Schema for Mongoose 
function createModel(){
    // Create a Schema with the name, age, email and phoneNumber attributes.
    const userSchema = mongoose.Schema(
        {
            name:{type: String, required: true},
            reps:{type: Number, required: true},
            weight:{type: Number, required: true},
            unit:{type: String, required: true},
            date:{type: Date,  default: Date.now, required: true}
        });
    // Create a model to match the Schema
    return mongoose.model(MODEL_STRING, userSchema);
}
// Initializes the model for the class
const Exercise = createModel();

async function createConnection(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING,
              {dbName: DB_NAME});
    }
    catch(err){
        throw Error(`Could not connect to MongoDB.`);
    }
  return mongoose.connection;
}


    

// Implement CRUD operations to export to users_controller.mjs
// All functions must be asynchronous, and wrapped in 


// Function which creates a new User in the MongoDB database
async function createExercise(name, reps, weight, unit, date) {
    // if phoneNumber is undefined, MongoDB ignores it
        const new_exercise = await new Exercise({name: name, reps: reps, weight:weight, unit:unit, date:date});
        return new_exercise.save();
    
}
// Function to get all existing documents.
async function getAllDocuments(){
    // .find() is called without a parameter, so all documents within the database are returned to the array.
    const return_array = await Exercise.find();
    // if db is empty, returns an empty array.
    return return_array;
}

// Function to return document with matching ID
async function getMatchingID(exercise_id){
    // As only one document can be assigned to an _id, findOne() can be called.
    const return_exercise = await Exercise.findOne({_id:exercise_id});
    // If no documents with specified _id, returns null.
    return return_exercise;
}
// Function to update a specific _id
async function changeExerciseFields(exercise_id,updated_body){
    // Create promise to update a document, found by _id, to the updated body.
    await Exercise.updateOne({_id:exercise_id}, updated_body);
    // return the document with updated fields.
    return Exercise.findOne({_id:exercise_id});
}
// Function that deletes a document based on the _id parameter.
async function deleteByID(exercise_id){
    await Exercise.deleteOne({_id: exercise_id});
    // Returns nothing
}





export { connect, createExercise, getAllDocuments, getMatchingID, changeExerciseFields, deleteByID };