import { useState } from 'react'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Part from './components/Part'
import Total from './components/Total'

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part => <Part key={part.id} title={part.name} number={part.exercises} />)}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
