import { hasSelectionSupport } from '@testing-library/user-event/dist/utils'
import React, {useState, useEffect} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Cell} from 'recharts'

import {bubbleSort, quickSort, cyclicSort, convertData, abortController} from './sortAlgos'

function App() {
  const [arrElem, setArrElem] = useState(0)
  const [section, setSection] = useState([])
  const [data, setData] = useState([])
  const [sortMethod, setSortMethod] = useState("Quick Sort")
  const [timeToComplete, setTimeToComplete] = useState(0)
  
  // const abortController = new AbortController()

  const handleSort = async () => {
    const start = window.performance.now()
    const dataArr = data.map(obj => obj.value)
    let sortedData; 
    if (sortMethod === "Quick Sort") {
      sortedData = await quickSort(dataArr, 0, dataArr.length - 1, setArrElem, setSection, setData)
    }

    if (sortMethod === "Bubble Sort") {
      sortedData = await bubbleSort(dataArr, setArrElem, setData)
      while (sortedData.find((val, index) => val > sortedData[index+1]) !== undefined) {
        await bubbleSort(dataArr, setArrElem, setData)
      }
    }

    console.log('finishing up')
    const end = window.performance.now()
    setTimeToComplete(end - start)
    setData(convertData(sortedData))
  }

  const handleReset = (e) => {
    let array = []
    while (array.length <= 5) {
      const obj = {}
      obj["index"] = array.length
      obj["value"] = Math.floor(Math.random() * 10) + 1
      array.push(obj)
    }

    console.log('state set')
    setTimeToComplete(0)
    setData(array)
    setArrElem(0)
    if (e) abortController.abort("canceled")
  }

  const handleFillBar = (index) => {
    if (index === arrElem) {
      return "#4caf50"
    } else if (section[index]) {
      return "yellow"
    } else {
      return "red"
    }
  }

  useEffect(() => {
    handleReset()
  }, [])

  return (
    <>
     <h4>Time to complete: {timeToComplete}ms</h4>
      <ResponsiveContainer height={500} width="50%">
        <BarChart data={data}>
          <XAxis dataKey="index"/>
          <YAxis dataKey="value"/>
          <CartesianGrid stroke="#ccc" strokeDasharray={"5 5"}/>
          <Tooltip />
          <Bar dataKey="value" stroke="#344F74" fill="#ba000d">
            {data.map((entry, index) => 
              <Cell key={`cell-${index}`} fill={handleFillBar(index)}/>
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <select onChange={(e) => setSortMethod(e.target.value)}>
        <option value="Quick Sort">Quick Sort</option>
        <option value="Bubble Sort">Bubble Sort</option>
        <option value="Cyclic Sort">Cyclic Sort</option>
      </select>
      <button onClick={handleSort}>Sort</button>
      <button onClick={handleReset}>Reset</button>

    </>
  );
}

export default App;
