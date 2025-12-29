import { useState, useEffect } from "react";
import ExerciseTable from "../components/ExerciseTable";
import { useNavigate } from "react-router-dom";

// Creates Retrieve Page, which retrieves all exercise documents when called.
export const RetrievePage = ({setExerciseToEdit}) =>{
    // Set variables to React Elements
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    // During the mounting of the page, uses fetch() to retrieve all exercises from the database.
    useEffect( () => {
        // To prevent the React's warning of cascading renders, the async function is declared within the useEffect.
        const loadExercises = async() =>{
            const response = await fetch('/exercises');
            const data = await response.json();
            // useState() function is then called to set exercises to retrieved documents
            setExercises(data);
        };
        // The async function defined above is immediately called.
        loadExercises();
    }, []);

    // onDelete is declared, to be passed to ExerciseTable and ExerciseRow, respectively, for each element rendered.
    const onDelete = async(_id, name) => {
        // Deletes the document with the associated _id
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204){
            // If successful, filter the exercise documents to exclude the deleted exercise.
            setExercises(exercises.filter((exercise) => exercise._id !== _id));
            alert(`Successfully deleted exercise "${name}".`);
        }
        else{
            // If the element cannot be deleted, no changes are made.
            alert(`Exercise "${name}" could not be deleted.`);
        }
    }
    // Passes the exercise selected to function declared in App.jsx
    const onEdit = async (exercise) =>{
        setExerciseToEdit(exercise);
        // Navigates user screen to UpdatePage.jsx
        navigate('/update');
    }


    return (
        // Return ExerciseTable, which is a <table> element that fills <tr> elements with map function()
        <table>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>     
        </table>
    
    
    );

}
export default RetrievePage;