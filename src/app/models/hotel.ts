import { Rating } from './rating';
import { Room } from './room';

export interface Hotel {
  id: string;
  title: string;
  location: string;
  locationOnMap: string;
  phone: string;
  email: string;
  thumbnailUrl: string;
  rooms: Room[];
  ratings: Rating[];
}
