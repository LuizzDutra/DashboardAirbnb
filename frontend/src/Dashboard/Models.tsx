

export interface NeighbourHoodGroupRating{
  neighbourhood_group: string;
  average_rating: number;
}

export interface NeighbourHoodGroupListing{
  neighbourhood_group: string;
  listings: number;
}

export interface RoomTypeCount{
  room_type: string;
  count: number;
}

export interface NeighbourHoodGroupPrice{
  neighbourhood_group: string;
  average_price: number;
}

export interface Host{
  host_name: string;
  listings_count: number;
  rated_count?: number;
  average_rating?: number;
  score?: number;
}

export interface HostCount{
  count: number;
}
