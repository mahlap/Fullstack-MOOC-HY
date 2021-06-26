import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

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
        <Part name={parts[0].name} number={parts[0].exercises}/>
        <Part name={parts[1].name} number={parts[1].exercises}/>
        <Part name={parts[2].name} number={parts[2].exercises}/>
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
      <Content part1={parts[0]} part2={parts[1]} part3={parts[2]} />
      <Total exercises={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App
//1.4 tehty