import { type NeighbourHoodGroupRating } from './Models';
import { getNeighbourHoodGroupRating } from './Requests';
import { type ChartData } from './Graphs'

export async function neighbourhoodGroupRatingData(): Promise<ChartData[]>{
  const result: NeighbourHoodGroupRating[] = await getNeighbourHoodGroupRating();

  const cleanedData: ChartData[] = result.map(item => ({
    name: item.neighbourhood_group,
    value: item.average_rating
  }));
  return cleanedData;
}

