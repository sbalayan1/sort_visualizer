import { setSelectionRange } from '@testing-library/user-event/dist/utils'
import React, {useState, useEffect, useCallback} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Cell} from 'recharts'
import { convertData, sleep } from './sortAlgos'

export default function QuickSort({setTimeToComplete, setStatus, delay, size, setDelay}) {
  const [i, setI] = useState(0)
  const [pivot, setPivot] = useState(null)
  const [data, setData] = useState([])
  const [currArr, setCurrArr] = useState([])
  const [isOn, setIsOn] = useState(false)

  const partition = async (arr, start, end) => {
    let swapIdx = start
    setStatus(`Pivot set to ${pivot}`)
    await sleep(delay)

    setPivot(swapIdx)
    await sleep(delay)

    for (let i = start+1; i<=end; i++) {
        setStatus("Loop through array. When first element is larger than the current element, increment swap index and swap I and the start element")
        await sleep(delay)

        setI(i)
        await sleep(delay)

        if (arr[i] < arr[start]) {
          setStatus("First element is larger than current element. Increasing swap index")
          await sleep(delay)

          swapIdx++
          setPivot(swapIdx)
          await sleep(delay)

          let temp = arr[swapIdx]
          arr[swapIdx] = arr[i]
          arr[i] = temp

          // [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]]
          setStatus("Swapping the current element and the swap index")
          await sleep(delay)

          setPivot(i)
          setI(swapIdx)
          setData(convertData(arr)) 
          await sleep(delay)
        }
    }

    setStatus("Done looping over array")
    await sleep(delay)

    setStatus("Swapping Start and SwapIdx")
    await sleep(delay)

    let temp = arr[swapIdx]
    arr[swapIdx] = arr[start]
    arr[start] = temp 

    setI(swapIdx)
    setPivot(start)
    setData(convertData(arr))
    await sleep(delay)
   
    return swapIdx
  }

  const quickSort = async (arr, left, right) => {
    setStatus("The current array is in yellow")
    setCurrArr(arr.slice(left, right+1))
    await sleep(delay)

    if (left < right) {
        setStatus("Partitioning")
        await sleep(delay)

        let pivotIndex = await partition(arr, left, right)
        setStatus("Done partitioning")
        await sleep(delay)

        // setStatus("Setting the post partition pivot")
        // setI(pivotIndex)

        setStatus("Sorting Left")
        await sleep(delay)
        await quickSort(arr, left, pivotIndex - 1)

        setStatus("Sorting Right")
        await sleep(delay)
        await quickSort(arr, pivotIndex + 1, right)
    }

    setData(convertData(arr))
    await sleep(delay)

    return arr
  }

  const noDelayPartition = (arr, start, end) => {
    let swapIdx = start
    let pivot = arr[start]

    for (let i = start+1; i<arr.length; i++) {
      if(pivot > arr[i]) {
        swapIdx++
        [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]]
      }
    }

    [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]]
    return swapIdx
  }

  const noDelayQuickSort = async (arr, left, right) => {
    if (left < right) {
      let pvtIdx = noDelayPartition(arr, left, right)
      await noDelayQuickSort(arr, left, pvtIdx - 1)
      await noDelayQuickSort(arr, pvtIdx+1, right)
    }

    return arr
  }


  const handleSort = async () => {
    const start = window.performance.now()
    const dataArr = data.map(obj => obj.value)
    const selectFunc = isOn ? quickSort : noDelayQuickSort
    let sortedData = await selectFunc(dataArr, 0, dataArr.length - 1)
  
    // while (sortedData.find((val, idx) => val > sortedData[idx+1])) {
    //   sortedData = await quickSort(dataArr, 0, dataArr.length - 1)
    // }

    setStatus("Sort complete")
    const end = window.performance.now()
    setTimeToComplete(Math.round(end - start))
    setData(convertData(sortedData))
  }

  const handleReset = useCallback(() => {
    const res = []
    while (res.length < size) {
      const obj = {}
      obj["index"] = res.length
      obj["value"] = Math.floor(Math.random() * 10) + 1
      res.push(obj)
    }
    setTimeToComplete(0)
    setData(res)
    setI(0)
    setStatus(null)
    setCurrArr([])
    setPivot(null)
  }, [setStatus, setTimeToComplete, size])

  const handleFillBar = (index) => {
    if (index === i) return "green"
    if (index === pivot) return "red"

    //need to fix
    // if (data.find(obj => obj.value === data[index].value)) return "yellow"
    return "red"
  }

  const handleDelay = () => {
    setIsOn(!isOn)
    setDelay(1000)
  }

  useEffect(() => {
    handleReset()
  }, [handleReset])

    return (
        <>
          <br></br>
          <label style={{backgroundColor: isOn ? "green" : "red"}}>Delay: {isOn ? "On": "Off"} @ {delay}ms</label>
          <button onClick={handleDelay}>{isOn ? "Turn Off": "Turn On"}</button>
          <br></br>
          {pivot ? `Pivot Value: ${data[pivot].value}`: null}
          <ResponsiveContainer height={500} width="50%">
              <BarChart data={data}>
              <XAxis dataKey="index"/>
              <YAxis dataKey="value"/>
              <CartesianGrid stroke="#ccc" strokeDasharray={"5 5"}/>
              <Tooltip />
              <Bar dataKey="value" stroke="#344F74" fill="#ba000d" label={data.length < 10 ? {fill: 'black', size: 20} : null}>
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