import { Photo } from './photo';

export interface Room {
  id: string;
  category: string;
  price: number;
  description: string;
  hotelId: string;
  photos?: Photo[];
}
