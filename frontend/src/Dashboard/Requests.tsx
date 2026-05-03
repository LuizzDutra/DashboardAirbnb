import axios from 'axios';
import { type NeighbourHoodGroupRating } from './Models'

export async function getNeighbourHoodGroupRating(): Promise<NeighbourHoodGroupRating[]>{
  const response = await axios.get<NeighbourHoodGroupRating[]>("http://127.0.0.1:8000/neigh_group_ratings/")
  return response.data
}
