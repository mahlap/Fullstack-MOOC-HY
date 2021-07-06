import React from 'react'

const Course = ({ courses }) => {
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
  

export default Course