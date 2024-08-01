import { useState } from 'react'

const StatisticLine = ({ text, number }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' number={good} />
            <StatisticLine text='neutral' number={neutral} />
            <StatisticLine text='bad' number={bad} />
            <StatisticLine text='all' number={good + neutral + bad} />
            <StatisticLine text='average' number={((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)} />
            <StatisticLine text='positive' number={(good / (good + neutral + bad)) * 100} />
          </tbody>
        </table>
      </div>
    )
  }
}

const Button = ({ onClick, text }) => (<button onClick={onClick} >{text}</button>)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
