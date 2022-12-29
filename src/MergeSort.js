import React, {useState, useEffect, useCallback} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Cell} from 'recharts'
import { convertData, sleep } from './sortAlgos'

export default function MergeSort({setTimeToComplete, setStatus, delay, isOn, seedData}) {
    const [i, setI] = useState(0)
    const [data, setData] = useState([])

    const mergeArrays = (left, right) => {
        const res = []
        while (left.length > 0 && right.length > 0) {
            const elem = left[0] > right[0] ? right.shift() : left.shift()
            res.push(elem)
        }
        return res.concat(left, right)
    }

    const mergeSort = (arr) => {
        if (arr.length <= 1) return arr
        const mid = Math.floor(arr.length/2)
        return mergeArrays(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid, arr.length)))
    }


    const handleSort = async () => {
        const start = window.performance.now()
        const dataArr = data.map(obj => obj.value)
        setStatus("sorting")
  
        let sortedData = await mergeSort(dataArr)
        console.log(sortedData)
        setStatus("sort complete")
        const end = window.performance.now()
        setData(convertData(sortedData))
        setTimeToComplete(Math.round(end-start))
    }

    const handleFillBar = (index) => {
        if (index === i) return "green"
        return "red"
    }

    const handleReset = useCallback(() => {
        const res = seedData()
        setTimeToComplete(0)
        setData(res)
        setI(0)
    }, [setTimeToComplete, seedData])

    useEffect(() => {
        handleReset()
    }, [handleReset])

    return (
        <>
          <br></br>
          {/* {pivot ? `Pivot Value: ${data[pivot].value}`: null} */}
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