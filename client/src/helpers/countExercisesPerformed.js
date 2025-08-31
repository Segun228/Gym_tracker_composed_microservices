const countExercisesPerformed = (workout) => {
    const exercises = workout?.workout_exercises
    if(!exercises || exercises.length<1){
        return 0
    }
    return exercises.length
}

export default countExercisesPerformed