const countSetsPerformed = (workout) => {
    const exercises = workout?.workout_exercises
    if(!exercises || exercises.length<1){
        return 0
    }
    let total_counter = 0
    for (const exercise of exercises) {
        total_counter += (exercise?.sets.length || 0)
    }
    return total_counter
}

export default countSetsPerformed