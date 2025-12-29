import '../App.css';

import { MdOutlineEdit, MdDelete } from "react-icons/md";
function ExerciseRow({ exercise, onDelete, onEdit, index}){
    return(

        // passed {exercise}: shows {exercise.name}, {exercise.reps}, etc.
        <tr key={index}>
            <td>{exercise.name}</td> 
            <td>{exercise.reps}</td> 
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td> 
            <td>{exercise.date?.split('T')[0]}</td>
            <td><a href="/" onClick={e => {e.preventDefault(); onEdit(exercise)}}><MdOutlineEdit/></a>&nbsp;</td>  
            <td><a href="/" onClick={e => {e.preventDefault(); onDelete(exercise._id, exercise.name)}}><MdDelete/></a></td>
        </tr>
    )
}

export default ExerciseRow;