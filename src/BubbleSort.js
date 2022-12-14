import React, {useState, useEffect, useCallback} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Cell} from 'recharts'

import { convertData, sleep } from './sortAlgos'

export default function BubbleSort({setTimeToComplete, isOn, setStatus, delay, seedData}) {
    const [i, setI] = useState(0)
    const [j, setJ] = useState(i+1)
    const [data, setData] = useState([])

    const handleFillBar = (index) => {
        if (index === i) return "#4caf50"
        if (index === j) return "yellow"
        return "red"
    }

    const handleSort = async () => {
        const start = window.performance.now()
        const dataArr = data.map(obj => obj.value)
        setStatus("Sorting")
        let selectedFunc = isOn ? bubbleSort : noDelayBubbleSort
        const sortedData = await selectedFunc(dataArr)
        while (sortedData.find((val, index) => val > sortedData[index+1]) !== undefined) {
            await selectedFunc(dataArr)
        }

        setStatus("Sort complete")
        const end = window.performance.now()
        setTimeToComplete(Math.round(end - start))
        setData(convertData(sortedData))
    }

    const bubbleSort = async (arr) => {
        for (let i = 0; i<arr.length;i++) {
            setStatus("looping through array. J is in yellow")
            await sleep(delay*2)

            let j = i+1
            setI(i)
            setJ(i+1)

            await sleep(delay)

            while (arr[i] > arr[j]) {
                setStatus("The current element is greater than the next element. Swapping the elements")
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
                await sleep(delay*2)

                setData(convertData(arr))
                setI(i+1)
                setJ(i)
                await sleep(delay*2)
                j++
                setJ(i+1)
            }
        }

        return arr
    }

    const noDelayBubbleSort = (arr) => {
        for (let i = 0; i<arr.length; i++) {
            let j = i+1
            while (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
                j++
            }
        }

        return arr
    }

    const handleReset = useCallback(() => {
        const res = seedData()

        setTimeToComplete(0)
        setData(res)
        setI(0)
        setJ(1)
    }, [setTimeToComplete, seedData])

    useEffect(() => {
        handleReset()
    }, [handleReset])

    return (
        <>
            <ResponsiveContainer height={500} width="50%">
                <BarChart data={data}>
                <XAxis dataKey="index"/>
                <YAxis dataKey="value"/>
                <CartesianGrid stroke="#ccc" strokeDasharray={"5 5"}/>
                <Tooltip />
                <Bar dataKey="value" stroke="#344F74" fill="#ba000d" label={data.length < 10 ? { fill:"black", fontSize: 20 }: null}>
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