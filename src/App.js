import React, {useState, useEffect} from 'react'
import {ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid} from 'recharts'

import {bubbleSort} from './sortAlgos'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(data => {
      let array = []
      let count = 10
      while (count > 0) {
        const obj = {}
        obj["index"] = 10 - count
        obj["value"] = Math.floor(Math.random()* 10) + 1
        array.push(obj)
        count --
      }

      setData(array)
    })
  }, [])

  return (
    <ResponsiveContainer height={500} width="50%">
      <BarChart data={data}>
        <XAxis dataKey="index"/>
        <YAxis dataKey="value"/>
        <CartesianGrid stroke="#ccc" strokeDasharray={"5 5"}/>
        <Tooltip />
        <Bar dataKey="value" stroke="#344F74" fill="#ba000d"/>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default App;
