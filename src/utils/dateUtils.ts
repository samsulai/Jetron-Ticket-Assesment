import { Event, EventsByDate } from '../types/event';
import { format, parseISO } from 'date-fns';

export const groupEventsByDate = (events: Event[]): EventsByDate => {
  return events.reduce((acc: EventsByDate, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});
};

export const formatDate = (date: string): string => {
  return format(parseISO(date), 'MMM dd, yyyy');
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};