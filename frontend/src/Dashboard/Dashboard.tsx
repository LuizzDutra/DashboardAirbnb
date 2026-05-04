import { useState, useEffect } from 'react'
import { 
  BarGraph, PieGraph,
  type ChartData } from './Graphs'
import { neighbourhoodGroupRatingData, neighbourhoodGroupListingData} from './Data'



function Dashboard() {

  const [neighGroupRating, setNeighGroupRating] = useState([])
  const [neighGroupListing, setNeighGroupListing] = useState([])

  useEffect(() => {
    const request = async () => {
      setNeighGroupRating(await neighbourhoodGroupRatingData());
      setNeighGroupListing(await neighbourhoodGroupListingData());
    }
    request();
  }, []);

     
  return (
    <>
    <BarGraph data={neighGroupRating} domain={4.5}/>
    <PieGraph data={neighGroupListing} />
    </>
  )
  

}


export default Dashboard
