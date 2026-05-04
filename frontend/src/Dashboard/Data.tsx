import { type NeighbourHoodGroupRating, type NeighbourHoodGroupListing } from './Models';
import { getNeighbourHoodGroupRating, getNeighbourHoodGroupListings } from './Requests';
import { type ChartData } from './Graphs'

export async function neighbourhoodGroupRatingData(): Promise<ChartData[]>{
  const result: NeighbourHoodGroupRating[] = await getNeighbourHoodGroupRating();

  const cleanedData: ChartData[] = result.map(item => ({
    name: item.neighbourhood_group,
    value: item.average_rating
  }));
  return cleanedData;
}

export async function neighbourhoodGroupListingData(): Promise<ChartData[]>{
  const result: NeighbourHoodGroupListing[] = await getNeighbourHoodGroupListings();

  const cleanedData: ChartData[] = result.map(item => ({
    name: item.neighbourhood_group,
    value: item.listings
  }));

  return cleanedData;
}

