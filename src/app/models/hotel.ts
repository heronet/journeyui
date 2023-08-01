import { Rating } from './rating';
import { Room } from './room';

export interface Hotel {
  id: string;
  title: string;
  location: string;
  locationOnMap: string;
  description: string;
  phone: string;
  email: string;
  rooms: Room[];
  ratings: Rating[];
}
