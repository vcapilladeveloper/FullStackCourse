const Total = (props) => {
    const exercises = props.course.parts.map(part => part.exercises)
    const initialValue = 0;
    const sumWithInitial = exercises.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    );
    return (
        <p><b>Total of {sumWithInitial} exercises</b></p>
    )
}

export default Total