import React, {useState, useEffect} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Cell} from 'recharts'

import { convertData, sleep } from './sortAlgos'

export default function QuickSort({setTimeToComplete}) {
  const [i, setI] = useState(0)
  const [currArr, setCurrArr] = useState([])
  const [data, setData] = useState([])
  const [status, setStatus] = useState("")

  const partition = (arr, start, end) => {
    let pivot = arr[start]
    let swapIdx = start

    for (let i = start+1; i<=end; i++) {
        if (arr[i] < pivot) {
            swapIdx++
            [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]]
        }
    }

    [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]]
    return swapIdx

  }

  const quickSort = async (arr, left, right) => {
    if (left < right) {
        setCurrArr(arr.slice(left, right+1))
        setStatus("partitioning")
        let pivotIndex = partition(arr, left, right)
        setI(pivotIndex)
        setStatus("Done partitioning")
        await sleep(2000)

        setStatus("Sorting Left")
        await quickSort(arr, left, pivotIndex - 1)
        setStatus("Sorting Right")
        await quickSort(arr, pivotIndex + 1, right)
    }
    setStatus("Finishing up")
    setData(convertData(arr))
    await sleep(1000)
    return arr
  }


  const handleSort = async () => {
    const start = window.performance.now()
    const dataArr = data.map(obj => obj.value)
    const sortedData = await quickSort(dataArr, 0, dataArr.length - 1)

    setStatus("Sort complete")
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
    setCurrArr([])
    setTimeToComplete(0)
    setData(array)
    setI(0)
  }

  const handleFillBar = (index) => {
    if (index === i) return "#4caf50"
    if (index < currArr.length) return "yellow"
    return "red"
  }

  useEffect(() => {
    handleReset()
  }, [])

    return (
        <>
          <h3>Partition</h3>

          <h3>Quick Sort</h3>
          {status ? status : null}
          <ResponsiveContainer height={500} width="50%">
              <BarChart data={data}>
              <XAxis dataKey="index"/>
              <YAxis dataKey="value"/>
              <CartesianGrid stroke="#ccc" strokeDasharray={"5 5"}/>
              <Tooltip />
              <Bar dataKey="value" stroke="#344F74" fill="#ba000d" label={{fill: 'black', fontSize:20}}>
                  {data.map((entry, index) => 
                  <Cell key={`cell-${index}`} fill={handleFillBar(index)}/>
                  )}
              </Bar>
              </BarChart>
          </ResponsiveContainer>
          <button onClick={handleSort}>Sort</button>
          <button onClick={handleReset}>Reset</button>
        </>
    )
}