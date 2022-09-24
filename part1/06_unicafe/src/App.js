import { useState } from 'react'

const StatisticLine = ({ text, value }) => <tr><td>{text}:</td><td>{value}</td></tr>

const FeedbackButton = ({ text, handler }) => <button onClick={handler}>{text}</button>

const Statistics = ({ fields, display }) => {
  return (
    <div>
      <h1>Statistics</h1>
        {display ?
          <table>
            <tbody>
              {fields.map((x, key) => <StatisticLine key={key} text={x.text} value={x.value} />)}
            </tbody>
          </table>
          :
            <div>No feedback given</div>
        }
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const fields = [
    { text: "Good", value: good },
    { text: "Neutral", value: neutral },
    { text: "Bad", value: bad },
    { text: "All", value: good + neutral + bad },
    { text: "Average", value: (good - bad)/(good + neutral + bad) },
    { text: "Positive", value: (good/(good + neutral + bad) * 100) + ' %' },
  ]
  
  return (
    <div>
      <h1>Give feedback</h1>
      <FeedbackButton text="Good" handler={() => setGood(good + 1)} />
      <FeedbackButton text="Neutral" handler={() => setNeutral(neutral + 1)} />
      <FeedbackButton text="Bad" handler={() => setBad(bad + 1)} />
  
      <Statistics fields={fields} display={good + neutral + bad !== 0}/>
    </div>
  )
}

export default App
