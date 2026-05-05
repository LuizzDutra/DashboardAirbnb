import { useState, useEffect } from 'react'
import './Dashboard.css'
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
  <div className="dashboard-container" style={{ display: 'grid', gap: '20px', padding: '20px' }}>
    
    <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr', gap: '20px'}}>
      <section className="card">
        <h3>Listings by Neighborhood</h3>
        <PieGraph data={neighGroupListing} />
      </section>
      <section className="card">
        <h3>Average Rating per Neighborhood</h3>
        <BarGraph data={neighGroupRating} domain={4.5} />
      </section>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr', gap: '20px'}}>
      <section className="card">
        <h3>Room Type Distribution</h3>
        <PieGraph data={roomTypeCount} />
      </section>
      <section className="card">
        <h3>Price per Neighborhood</h3>
        <BarGraph data={neighGroupPrice} />
      </section>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
    className="fixed-card">
      <section style={{ border: '4px solid var(--border-color)'}}>
      <HostsTable 
        hosts={topHost} 
        pageSize={5} 
        page={hostPage}
        onPageChange={setTopHostCallback}
        totalCount={hostCount}
        tableTitle="Top Hosts"
        tableSort="score"
      />
      </section>
      <section style={{ border: '4px solid var(--border-color)'}}>
      <HostsTable 
        tableTitle="Biggest Hosts"
        tableSort="listing count"
        hosts={bigHost} 
        pageSize={5} 
        page={bigHostPage}
        onPageChange={setBigHostCallback}
        totalCount={hostCount}
      />
      </section>
    </div>

  </div>
);


}


export default Dashboard
