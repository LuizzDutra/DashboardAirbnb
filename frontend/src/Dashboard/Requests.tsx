import axios from 'axios';


export async function getNeighbourHoodGroupRating(){
  const response = await axios.get("http://127.0.0.1:8000/neigh_group_ratings/")
  return response.data
}
