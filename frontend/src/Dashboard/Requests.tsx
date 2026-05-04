import axios from 'axios';
import { 
  type NeighbourHoodGroupRating, 
  type NeighbourHoodGroupListing,
  type NeighbourHoodGroupPrice,
  type Host, type HostCount
} from './Models'


const baseUrl = "http://127.0.0.1:8000/"

export async function getHostCount(): Promise<number>{
  const response = await axios.get<HostCount>(baseUrl + "host_count/");
  return response.data.count;
}

export async function getNeighbourHoodGroupRatings(): Promise<NeighbourHoodGroupRating[]>{
  const response = await axios.get<NeighbourHoodGroupRating[]>(baseUrl + "neigh_group_ratings/")
  return response.data
}

export async function getNeighbourHoodGroupListings(): Promise<NeighbourHoodGroupListing[]>{
  const response = await axios.get<NeighbourHoodGroupListing[]>(baseUrl + "neigh_group_listings/")
  return response.data
}

export async function getNeighbourHoodGroupPrices(): Promise<NeighbourHoodGroupPrice[]>{
  const response = await axios.get<NeighbourHoodGroupPrice[]>(baseUrl + "neigh_group_prices/")
  return response.data
}

export async function getTopHosts(offset: number = 0): Promise<Host[]>{
  const response = await axios.get<Host[]>(baseUrl + "top_hosts/" + offset.toString())
  return response.data
}
