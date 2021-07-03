import React, { useState } from 'react'

const Statistics = (props) => {
  const All = props.good + props.bad + props.neutral
  if (All > 0) {
  return (
    <>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <p>all {All}</p>
    <p>average {(props.good - props.bad) / All}</p>
    <p>positive {(props.good / All)*100} %</p>
    </>
  )
  } else {
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }
}

const App = () => {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
//1.9 tehty