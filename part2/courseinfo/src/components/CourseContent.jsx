import Part from './Part'

const CourseContent = (props) => {
    return (
      <div>
        {props.course.parts.map(part => <Part key={part.id} title={part.name} number={part.exercises} />)}
      </div>
    )
  }

export default CourseContent