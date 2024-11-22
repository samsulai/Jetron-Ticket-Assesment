export interface Event {
  id: string;
  name: string;
  date: string;
  category: string;
  location: string;
  price: number;
  posterUrl: string;
}

export type EventsByDate = Record<string, Event[]>;