import ExerciseRow from "./ExerciseRow";


function ExerciseTable({ exercises, onDelete, onEdit}){
    return(
        <div>
            <h2 className="exercise-table-label"> All Exercises</h2>
            <table>
                <thead>
                    <tr>
                        <th> Exercise Name</th>
                        <th> Total Reps</th>
                        <th> Total Weight</th>
                        <th> Units</th>
                        <th> Date</th>
                        <th> Edit</th>
                        <th> Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} 
                                            onDelete={onDelete} onEdit={onEdit} key={i}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ExerciseTable;