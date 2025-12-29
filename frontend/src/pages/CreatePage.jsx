import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const  CreatePage = () => {
    // Sets useState() for data to be filled out
    const [name, setName] = useState('');
    const [reps, setReps] = useState(1);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

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
    // Function called when exercise is submitted.
    const addExercise = async () => {
        // console.log(`Name: ${typeof(name)} Reps: ${typeof(reps)} Weight: ${typeof(weight)} Unit: ${typeof(unit)}, Date: ${(date)}`);
        // console.log(`Name: ${(name)} Reps: ${(reps)} Weight: ${(weight)} Unit: ${(unit)}, Date: ${(date)}`)
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            '/exercises',
            {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
            }
        );
        if (response.status === 201)
            alert(`Added exercise "${name}" on ${date}.`);
        else
            // If invalid, including the check from the backend controller, print error
            alert("Failed to add exercise. Please check all required fields and try again.");
        // In either case, navigate back to home screen.
        navigate('/');
    };

    return (
            <form>
                <p>
                    <label>
                        Exercise Name
                        <br/>
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
                        <br/>
                        <input
                        className='input-number-box'
                        type="number"
                        value={reps}
                        required
                        name="reps"
                        placeholder="Total reps"
                        onChange={ e => checkMinimumReps(e.target.valueAsNumber)}/>
                    </label>
                </p>  
                <p>
                    <label>
                        Total Weight
                        <br/>
                        <input
                        className='input-number-box'
                        type="number"
                        name="weight"
                        placeholder="Weight amount"
                        value={weight}
                        onChange={e => checkMinimumWeight(e.target.valueAsNumber)}
                        required/>
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
                <button type="button" onClick={addExercise}>Add</button>
            </form>
    );
}

export default CreatePage;