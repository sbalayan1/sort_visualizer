import React, {useState, useEffect} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid} from 'recharts'

import {bubbleSort, quickSort, convertData} from './sortAlgos'

function App() {
  const [data, setData] = useState([])
  const [sortMethod, setSortMethod] = useState("Quick Sort")
  const [timeToComplete, setTimeToComplete] = useState(0)

  
  const handleSort = () => {
    const start = window.performance.now()
    const dataArr = data.map(obj => obj.value)
    let sortedData; 
    if (sortMethod === "Quick Sort") {
      sortedData = quickSort(dataArr, 0, dataArr.length - 1)
    }

    if (sortMethod === "Bubble Sort") {
      sortedData = bubbleSort(dataArr)
      while (sortedData.find((val, index) => val > sortedData[index+1]) !== undefined) {
        bubbleSort(dataArr)
      }
    }

    const end = window.performance.now()
    setTimeToComplete(end - start)
    setData(convertData(sortedData))
  }

  const handleReset = () => {
    let array = []
    while (array.length < 10) {
      const obj = {}
      obj["index"] = array.length
      obj["value"] = Math.floor(Math.random()* 10) + 1
      array.push(obj)
    }

    console.log('state set')
    setTimeToComplete(0)
    setData(array)
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
          <Bar dataKey="value" stroke="#344F74" fill="#ba000d"/>
        </BarChart>
      </ResponsiveContainer>
      <select onChange={(e) => setSortMethod(e.target.value)}>
        <option value="Quick Sort">Quick Sort</option>
        <option value="Bubble Sort">Bubble Sort</option>
      </select>
      <button onClick={handleSort}>Sort</button>
      <button onClick={handleReset}>Reset</button>

    </>
  );
}

export default App;
