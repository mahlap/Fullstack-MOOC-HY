import React from 'react'



const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
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

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map(course =>
    <CourseParts key={course.id} course={course}/>
    )}
    </>
  )
}

const CourseParts = ({ course }) => {
  return (
    <>
    <Header course={course}/>
    <Content course={course}/>
    <Total course={course}/>
    </>
  )
} 

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Coolest web development courses ever</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App

//2.4 tehty