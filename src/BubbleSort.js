import React, {useState, useEffect} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Cell, Label} from 'recharts'

import { convertData, sleep } from './sortAlgos'

export default function BubbleSort({setTimeToComplete}) {
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
        const sortedData = await bubbleSort(dataArr)
        while (sortedData.find((val, index) => val > sortedData[index+1]) !== undefined) {
            await bubbleSort(dataArr)
        }
    
        console.log('finishing up')
        const end = window.performance.now()
        setTimeToComplete(Math.round(end - start))
        setData(convertData(sortedData))
    }

    const bubbleSort = async (arr) => {
        for (let i = 0; i<arr.length;i++) {
            let j = i+1
            setI(i)
            setJ(i+1)
            await sleep(1000)

            while (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
                setData(convertData(arr))
                setI(i+1)
                setJ(i)
                await sleep(2000)
                j++
                setJ(i+1)
            }
        }
        return arr
    }

    const handleReset = () => {
        let arr = []
        while (arr.length < 5) {
            const obj = {}
            obj["index"] = arr.length
            obj["value"] = Math.floor(Math.random() * 10) + 1
            arr.push(obj)
        }

        setTimeToComplete(0)
        setData(arr)
        setI(0)
        setJ(1)
    }

    useEffect(() => {
        handleReset()
    }, [])

    return (
        <>
            <ResponsiveContainer height={500} width="50%">
                <BarChart data={data}>
                <XAxis dataKey="index"/>
                <YAxis dataKey="value"/>
                <CartesianGrid stroke="#ccc" strokeDasharray={"5 5"}/>
                <Tooltip />
                <Bar dataKey="value" stroke="#344F74" fill="#ba000d" label={{ fill:"black", fontSize: 20 }}>
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