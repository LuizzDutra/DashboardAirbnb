import { 
  type NeighbourHoodGroupRating, 
  type NeighbourHoodGroupListing,
  type NeighbourHoodGroupPrice,
  type Host,
  type RoomTypeCount
} from './Models';
import { 
  getNeighbourHoodGroupRatings, 
  getNeighbourHoodGroupListings,
  getNeighbourHoodGroupPrices,
  getTopHosts, getBiggestHosts,
  getRoomTypeCount,
} from './Requests';
import { type ChartData } from './Graphs'

export async function neighbourhoodGroupRatingData(): Promise<ChartData[]>{
  const result: NeighbourHoodGroupRating[] = await getNeighbourHoodGroupRatings();

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


export async function neighbourhoodGroupPriceData(): Promise<ChartData[]>{
  const result: NeighbourHoodGroupPrice[] = await getNeighbourHoodGroupPrices();

  const cleanedData: ChartData[] = result.map(item => ({
    name: item.neighbourhood_group,
    value: item.average_price
  }));

  return cleanedData;
}

export async function topHostsData(offset: number): Promise<Host[]>{
  const result: Host[] = await getTopHosts(offset);

  return result;

}


export async function bigHostData(offset: number): Promise<Host[]>{
  const result: Host[] = await getBiggestHosts(offset);

  return result;
}


export async function roomTypeCountData(): Promise<ChartData[]>{
  const result: RoomTypeCount[] = await getRoomTypeCount();

  const cleanedData: ChartData[] = result.map(item => ({
    name: item.room_type,
    value: item.count
  }));

  return cleanedData;
}
