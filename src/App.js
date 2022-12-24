import React, {useState} from 'react'
// import {bubbleSort, quickSort, cyclicSort, convertData, abortController} from './sortAlgos'

import QuickSort from './QuickSort'
import BubbleSort from './BubbleSort'
import SelectionSort from './SelectionSort'


function App() {
  const [size, setSize] = useState("")
  const [sortMethod, setSortMethod] = useState("Quick Sort")
  const [timeToComplete, setTimeToComplete] = useState(0)
  const [delay, setDelay] = useState(0)
  const [status, setStatus] = useState(null)
  const [isOn, setIsOn] = useState(false)

  const handleDelay = () => {
    setIsOn(!isOn)
    setDelay(1000)
  }
  
  return (
    <>
     <h4>Time to complete: {timeToComplete}ms</h4>
     {/* Need to disable when sort is working. If user changes sort method mid sort, the previous sort method runs in the background. */}
     <label>Sort Method: </label>
     <select onChange={(e) => setSortMethod(e.target.value)}> 
        <option value="Quick Sort">Quick Sort</option>
        <option value="Bubble Sort">Bubble Sort</option>
        <option value="Selection Sort">Selection Sort</option>
      </select>
      <br></br>
      
      <label>Delay Time: </label>
      <select onChange={(e) => setDelay(parseInt(e.target.value, 10))}>
        <option value="0">0ms</option>
        <option value="1000">1000ms</option>
        <option value="2000">2000ms</option>
        <option value="3000">3000ms</option>
      </select>
      <br></br>

      <label>Data Size: </label>
      <input onChange={(e) => setSize(e.target.value)} value={size} placeholder="Input data size..."/>
      <br></br>
      {status ? `Status: ${status}`: null}
      <br></br>
      <label style={{backgroundColor: isOn ? "green" : "red"}}>Delay: {isOn ? "On": "Off"} @ {delay}ms</label>
      <button onClick={handleDelay}>{isOn ? "Turn Off": "Turn On"}</button>

      {sortMethod === "Quick Sort" ? <QuickSort setTimeToComplete={setTimeToComplete} delay={delay} isOn={isOn} setStatus={setStatus} size={size}/> : null}
      {sortMethod === "Bubble Sort" ? <BubbleSort setTimeToComplete={setTimeToComplete} size={size} isOn={isOn}/>: null}
      {sortMethod === "Selection Sort" ? <SelectionSort setTimeToComplete={setTimeToComplete} delay={delay} setStatus={setStatus} size={size}/> : null}
    </>
  );
}

export default App;
