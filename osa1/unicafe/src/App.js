import React, { useState } from 'react'

const Statistics = (props) => {
  const All = props.good + props.bad + props.neutral
  if (All > 0) {
  return (
    <table>
      <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={All} />
      <StatisticLine text="average" value ={(props.good - props.bad) / All} />
      <StatisticLine text="positive" value ={(props.good / All)*100} prosentti="%"/>
      </tbody>
    </table>
  )
  } else {
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }
}

const StatisticLine = (props) => {
  return (
  <tr>
  <td>{props.text}</td><td>{props.value} {props.prosentti}</td>
  </tr>
  )
}

const Button = (props) => {
  return (
    <>
    <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const App = () => {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App