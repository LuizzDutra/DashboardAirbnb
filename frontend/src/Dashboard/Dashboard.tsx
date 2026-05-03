import { useState, useEffect } from 'react'
import { BarGraph, type ChartData } from './Graphs'
import { neighbourhoodGroupRatingData } from './Data'



function Dashboard() {
  const data: ChartData[] = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 600 },
  ];

  const [requestData, setRequestData] = useState([])

  useEffect(() => {
    const request = async () => {
      setRequestData(await neighbourhoodGroupRatingData());
    }
    request();
  }, []);

     
  return (
    <>
    <div> "Hello world" </div>
    <BarGraph data={data}/>
    <BarGraph data={requestData} domain={4.5}/>
    </>
  )
  

}


export default Dashboard
