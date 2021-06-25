import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part name={part1.name} number={part1.exercises}/>
        <Part name={part2.name} number={part2.exercises}/>
        <Part name={part3.name} number={part3.exercises}/>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <>
        <p>{props.exercises}</p>
      </>
    )
  }

  const Part = (props) => {
    return (
      <>
        <p>{props.name} {props.number}</p>
      </>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App
//1.3 tehty