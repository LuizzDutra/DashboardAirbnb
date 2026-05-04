import { useState, useEffect } from 'react'
import { 
  BarGraph, PieGraph,
  type ChartData } from './Graphs'
import { 
  neighbourhoodGroupRatingData, 
  neighbourhoodGroupListingData,
  neighbourhoodGroupPriceData,
  topHostsData
} from './Data'
import {
  getHostCount
} from './Requests'
import HostsTable from "./HostsTable";



function Dashboard() {

  const [neighGroupRating, setNeighGroupRating] = useState([]);
  const [neighGroupListing, setNeighGroupListing] = useState([]);
  const [neighGroupPrice, setNeighGroupPrice] = useState([]);
  const [topHost, setTopHost] = useState([]);
  const [hostCount, setHostCount] = useState(0);
  const [hostPage, setHostPage] = useState(1);
  
  async function setTopHostCallback(page: number){
     setTopHost(await topHostsData(page-1));
     setHostPage(page);

  }


  useEffect(() => {
    const request = async () => {
      setNeighGroupRating(await neighbourhoodGroupRatingData());
      setNeighGroupListing(await neighbourhoodGroupListingData());
      setNeighGroupPrice(await neighbourhoodGroupPriceData());
      setTopHost(await topHostsData(0));
      setHostCount(await getHostCount());
    }
    request();
  }, []);

     
  return (
    <>
    <BarGraph data={neighGroupRating} domain={4.5}/>
    <PieGraph data={neighGroupListing} />
    <BarGraph data={neighGroupPrice} />
    <HostsTable 
    hosts={topHost} 
    pageSize={5} 
    page={hostPage}
    onPageChange={setTopHostCallback}
    totalCount={hostCount}
    />
    </>
  )
  

}


export default Dashboard
