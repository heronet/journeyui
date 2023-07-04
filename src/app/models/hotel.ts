import { Room } from './room';

export interface Hotel {
  id: string;
  title: string;
  location: string;
  locationOnMap: string;
  rooms: Room[];
}
