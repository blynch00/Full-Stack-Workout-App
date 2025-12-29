import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UpdatePage = ({exerciseToEdit}) =>{
    // Set the default states to the pre-existing data
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date?.split('T')[0]);
    

    const navigate = useNavigate();

    // When changes are final, use a PUT endpoint on the initial ID to change the values saved in the DB.
    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`,
            {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(editedExercise)
            });
            // If successfull, return success message; otherwise, give a failure message, and navigate to home.
        if (response.status === 200){
            alert(`Successfully edited exercise "${name}".`);
        }
        else{
            alert(`Failed to edit exercise. Please check all required fields and try again.`);
        }
        navigate('/');
    };

     // Function to prevent reps from going to or 0; newInput = e.target.valueAsNumber
    const checkMinimumReps = (newInput) => {
        // If the new variable is less than 1, or if it equals "NaN", reset value to 1.
        if (newInput <= 0 || isNaN(newInput))
            setReps(1);
        // Otherwise, this is a valid input, so we update the state.
        else
            setReps(newInput);
    }

    // Function to prevent weight from going below 0; newInput = e.target.valueAsNumber
    const checkMinimumWeight = (newInput) => {
        // If newInput is less than 0, or isNaN returns true, reset weight to 0
        if (newInput <= 0 || isNaN(newInput))
            setWeight(0);
        // If a valid input, call useState() function.
        else
            setWeight(newInput);
    }

    return (
            <form>
                <p>
                    <label>
                        Exercise Name
                        <input
                        type="text"
                        placeholder="Exercise name"
                        value={name}
                        name="name"
                        required
                        onChange={e => setName(e.target.value)} />
                    </label>
                </p>
                <p>
                    <label>
                        Total Reps
                        <input
                        type="number"
                        value={reps}
                        required
                        name="reps"
                        placeholder="Total reps"
                        onChange={e => checkMinimumReps(e.target.valueAsNumber)}/>
                    </label>
                </p>  
                <p>
                    <label>
                        Total Weight
                        <input
                        type="number"
                        name="weight"
                        placeholder="Weight amount"
                        value={weight}
                        required
                        onChange={e => checkMinimumWeight(e.target.valueAsNumber)}/>
                    </label>
                </p>
                <p>
                    <label>
                        Unit
                        <br/>
                        <select 
                            type="text" 
                            value={unit} 
                            name="unit"
                            required
                            onChange={e => setUnit(e.target.value)}>
                        <option value="lbs"> lbs </option>
                        <option value="kgs"> kgs </option>
                        <option value="miles"> miles </option>
                        </select>
                        </label> 
                </p>

                <p>
                    <label>
                        Date
                        <br/>
                        <input
                            type="date"
                            value={date}
                            required
                            name="exercise date"
                            onChange={e => setDate(e.target.value)} />
                        </label>
                </p>
                <button type="button" onClick={editExercise}>Submit Changes</button>
            </form>
        
    );
}

export default UpdatePage;