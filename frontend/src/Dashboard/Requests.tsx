import axios from 'axios';
import { type NeighbourHoodGroupRating, type NeighbourHoodGroupListing } from './Models'


const baseUrl = "http://127.0.0.1:8000/"


export async function getNeighbourHoodGroupRating(): Promise<NeighbourHoodGroupRating[]>{
  const response = await axios.get<NeighbourHoodGroupRating[]>(baseUrl + "neigh_group_ratings/")
  return response.data
}

export async function getNeighbourHoodGroupListings(): Promise<NeighbourHoodGroupListing[]>{
  const response = await axios.get<NeighbourHoodGroupListing[]>(baseUrl + "neigh_group_listings/")
  return response.data
}
