import React, {useState, useEffect} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid, Cell} from 'recharts'

export default function selectionSort({}) {
    const [i, setI] = useState(0)
    const handleSort = () => {

    }
    const handleReset = () => {
        
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