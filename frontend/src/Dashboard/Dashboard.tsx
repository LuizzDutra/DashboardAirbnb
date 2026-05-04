import { useState, useEffect } from 'react'
import { 
  BarGraph, PieGraph,
  type ChartData } from './Graphs'
import { 
  neighbourhoodGroupRatingData, 
  neighbourhoodGroupListingData,
  neighbourhoodGroupPriceData,
  topHostsData, bigHostData,
  roomTypeCountData,
} from './Data'
import {
  getHostCount
} from './Requests'
import HostsTable from "./HostsTable";



function Dashboard() {

  const [neighGroupRating, setNeighGroupRating] = useState([]);
  const [neighGroupListing, setNeighGroupListing] = useState([]);
  const [neighGroupPrice, setNeighGroupPrice] = useState([]);

  const [hostCount, setHostCount] = useState(0);
  
  const [topHost, setTopHost] = useState([]);
  const [hostPage, setHostPage] = useState(1);

  
  const [bigHost, setBigHost] = useState([]);
  const [bigHostPage, setBigHostPage] = useState(1);

  const [roomTypeCount, setRoomTypeCount] = useState([]);

  
  async function setTopHostCallback(page: number){
     setTopHost(await topHostsData(page-1));
     setHostPage(page);

  }

  async function setBigHostCallback(page: number){
     setBigHost(await bigHostData(page-1));
     setBigHostPage(page);
  }


  useEffect(() => {
    const request = async () => {
      setNeighGroupRating(await neighbourhoodGroupRatingData());
      setNeighGroupListing(await neighbourhoodGroupListingData());
      setNeighGroupPrice(await neighbourhoodGroupPriceData());
      setRoomTypeCount(await roomTypeCountData());

      setHostCount(await getHostCount());
      
      setTopHost(await topHostsData(0));

      setBigHost(await bigHostData(0));
    }
    request();
  }, []);

     
  return (
    <>
    <BarGraph data={neighGroupRating} domain={4.5}/>
    <PieGraph data={neighGroupListing} />
    <PieGraph data={roomTypeCount} />
    <BarGraph data={neighGroupPrice} />
    <HostsTable 
    hosts={topHost} 
    pageSize={5} 
    page={hostPage}
    onPageChange={setTopHostCallback}
    totalCount={hostCount}
    tableTitle="Top Hosts"
    tableSort="score"
    />
    <HostsTable 
    tableTitle="Biggest Hosts"
    tableSort="listing count"
    hosts={bigHost} 
    pageSize={5} 
    page={bigHostPage}
    onPageChange={setBigHostCallback}
    totalCount={hostCount}
    />

    </>
  )
  

}


export default Dashboard
