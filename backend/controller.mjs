import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './models.mjs';

const PORT = process.env.PORT;

const app = express();
app.use(express.json())

// Calls function from model.mjs to connect to the 'exercises' collection in 'exercise_db'
app.listen(PORT, async () => {
    await exercises.connect(false);
    console.log(`Server listening on port ${PORT}...`);
});

// Function to check if all required fields are valid
function isBodyValid(name, reps, weight, unit, date){
    // If any of the required fields are missing, return false
        // if weight is not changed from 0, !weight is evaluated to true, and this returns false.
    if (!name || !reps || (!weight && weight !== 0)  || !unit)
        return false;

    // If the name isn't a string, or if it is empty, return false
    if (typeof name !== 'string' || name.length < 1)
        return false;

    // If the reps are not a number, or is less than 0, return false
    if (typeof reps !== 'number' || reps <= 0)
        return false;

    // If weight is not a number, or less than 0, return false
    if (typeof weight !== 'number' || weight < 0)
        return false;
    
    // If the unit is not a string, or is not one of the 3 selected units, return false
    const unit_inputs = ['kgs', 'lbs', 'miles'];
    if (typeof unit !== 'string'  || !unit_inputs.includes(unit))
        return false;
    // If the date, when parsed, is "NaN", or the date is not 10 characters long (YYYY-MM-DD), return false
    if (Date.parse(date) === "NaN" || date.length !== 10)
        return false; 

    // If all other tests, pass, return True.
    return true;
}

//----------------------------------------------------- Request Routing -----------------------------------------------------//

    /* 1. "POST/exercises"- Creates a new user
            Request: JSON object with all required properties (must be validated)
            Response: JSON object + 201 status code, or 400 status code and error message.*/

app.post('/exercises', asyncHandler(async (req,res) => {
    // Set all request fields, passed to validate
    const req_body = req.body;
    // isBodyValid returns a boolean, and if invalid, sends a 400 error;
    const checkValid = isBodyValid(
        req_body.name,
        req_body.reps,
        req_body.weight,
        req_body.unit,
        req_body.date);
    //const checkValid = isBodyValid(req_name,req_reps,req_weight,req_unit,req_date)
    if (checkValid == false){
        res.status(400).json({ "Error": "Invalid request" });
    }
    // Otherwise, creates the valid exercise and returns a 201 status.
    else{
        const return_body = await exercises.createExercise(
        req_body.name,
        req_body.reps,
        req_body.weight,
        req_body.unit,
        req_body.date);
        res.status(201).json(return_body)
    }  
}))



    /* 2. "GET/exercises"- Requests all exercise documents
            Request: N/A
            Response: JSON array of all documents, status code 200.*/

app.get('/exercises', asyncHandler(async (req,res) =>{
    // No validation or checks for _id needed, as it requests all documents.
    const all_exercises = await exercises.getAllDocuments();
    res.status(200).json(all_exercises);
}))

    /* 3. "GET/exercises/:id"- Get a document by the unique id attribute
            Request: document id (_id), no req body.
            Response: JSON object + 200 status code, or status code 404 and {"Error": "Not found"}*/

app.get('/exercises/:id', asyncHandler(async(req,res) => {
    const exercise_id = req.params.id;
    const return_exercise = await exercises.getMatchingID(exercise_id);
    // If the value returned is not null, there is a matching exercise, so this is returned.
    if(return_exercise){
        res.status(200).json(return_exercise);
    }
    else{
        res.status(404).json({"Error":"Not found"});
    }
}))

    /* 3. "PUT/exercises/:id"- Updates existing document
            Request: Document ID (_id), JSON object with all required properties (must be validated)
            Response: JSON object + 200 status code, or status code 404 and {"Error": "Not found"}, or status code 400 
            and {"Error": "Invalid request"} if invalid request.*/
    app.put('/exercises/:id',asyncHandler(async(req,res) => {
    const exercise_id = req.params.id;
    const req_body = req.body;
    const checkValid = isBodyValid(
        req_body.name,
        req_body.reps,
        req_body.weight,
        req_body.unit,
        req_body.date)
    const find_exercise = exercises.getMatchingID(exercise_id);
    // Must check for invalid request, and then check for missing exercise
    if (checkValid == false){
        res.status(400).json({ "Error": "Invalid request" });
    }
    
    else if (!find_exercise){
        res.status(404).json({"Error":"Not found"});
    }
    // If the request if valid, and the exercise is found, update object and return 200.
    else{
        const exercise_edits = await exercises.changeExerciseFields(exercise_id, req.body);
        res.status(200).json(exercise_edits);
    }
}))
/* 4. "DELETE/exercises/:id"- Deletes existing document
        Request: Document ID (_id), no req body.
        Response: 204 status code and no response body, or status code 404 and {"Error": "Not found"}.*/

app.delete('/exercises/:id', asyncHandler(async(req,res) => {
    const exercise_id = req.params.id;
    const find_exercise = await exercises.getMatchingID(exercise_id)
    // If there does not exist a matching exercise to the _id, return 404
    if(!find_exercise){
        res.status(404).json({"Error":"Not found"});
    }
    // Otherwise, delete by the _id and just send a 204.
    else{
        await exercises.deleteByID(exercise_id);
        res.sendStatus(204);
    }
}));
