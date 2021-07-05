import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, parts) => 
  parts.exercises + sum, 0)

  return(
    <p><strong>total of {total} exercises</strong></p>
  ) 
}

const Part = ({ course }) => {
  return (
    <p>
      {course.name} {course.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(courses => 
        <Part key={courses.id} course={courses} />
        )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
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

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App

//2.3 tehty