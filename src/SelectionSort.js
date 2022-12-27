import React, {useState, useEffect, useCallback} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Cell} from 'recharts'
import { convertData, sleep } from './sortAlgos'

export default function SelectionSort({setTimeToComplete, delay, setStatus, seedData}) {
    const [i, setI] = useState(0)
    const [j, setJ] = useState(null)
    const [min, setMin] = useState(null)
    const [data, setData] = useState([])
    
    const selectionSort = async (arr) => {
        for (let i = 0; i<arr.length; i++) {
            let min = i
            setStatus("Iterating through data!")
            await sleep(delay)

            setMin(min)
            setI(i)
            setJ(null)
            await sleep(delay)

            for (let j = i+1; j<arr.length; j++) {
                setStatus("Comparing J to MIN value")
                await sleep(delay*2)

                setJ(j)
                await sleep(delay)

                if (arr[min] > arr[j]) {
                    min = j
                    setStatus("Updating the MIN value!")
                    await sleep(delay*2)

                    setMin(min)
                    setJ(min)
                    await sleep(delay)
                }
            }

            if (i !== min) {
                [arr[i], arr[min]] = [arr[min], arr[i]]
                setStatus("Swapping I and the MIN values!")
                await sleep(delay*2)

                setMin(i)
                setI(min)
                setData(convertData(arr))
                await sleep(delay)
            }
        }


        setStatus("Sort complete!")
        return arr
    }

    const handleSort = async () => {
        const start = window.performance.now()
        const dataArr = data.map(obj => obj.value)
        setStatus("Sorting")
        const sortedArr = await selectionSort(dataArr)
        while (sortedArr.find((obj, idx) => obj > sortedArr[idx+1] )) {
            await selectionSort(dataArr)
        }

        const end = window.performance.now()
        setTimeToComplete(Math.round(end - start))
        setData(convertData(sortedArr))
    }

    const handleReset = useCallback(() => {
        const res = seedData()
        setI(0)
        setJ(null)
        setMin(null)
        setStatus(null)
        setData(res)
        setTimeToComplete(0)
    }, [setStatus, setTimeToComplete, seedData])
    
    const handleFillBar = (index) => {
        if (index === i) return "green"
        if (index === min) return "orange"
        if (index === j) return "yellow"
        return "red"
    }

    useEffect(() => {
        handleReset()
    }, [handleReset])

    return (
        <>
            <br></br>
            {min ? `Min Value: ${data[min].value}`: null}
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