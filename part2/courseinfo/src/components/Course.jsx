import Header from './Header'
import Total from './Total'
import CourseContent from './CourseContent'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <CourseContent course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course