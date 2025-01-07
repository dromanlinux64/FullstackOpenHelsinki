
import { useState } from 'react'

const StatisticLine = (props) =>(
  <tr><td>{props.text}</td><td>{props.value}{props.sufix}</td></tr>
)

const Statistics = (props) =>{
  const total = props.good+props.neutral+props.bad;
  if (total) 
  return (
  <table>
    <tbody>
    <StatisticLine text="Good" value={props.good} sufix=""/>
    <StatisticLine text="Neutral" value={props.neutral} sufix=""/>
    <StatisticLine text="Bad" value={props.bad} sufix=""/>
    <StatisticLine text="All" value={total} sufix=""/>
    <StatisticLine text="Average" value={(props.good*1+props.neutral*0+props.bad*-1)/total} sufix=""/>
    <StatisticLine text="Positive" value={props.good/total*100} sufix=" %"/>
    </tbody>
  </table>
   )
  else
  return (
  <>
    <p>No feedback given</p>
  </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)




const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={()=>setGood(good+1)} text="Good" />      
      <Button handleClick={()=> setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={()=>setBad(bad + 1)} text="Bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>     
    </div>
  )
}

export default App