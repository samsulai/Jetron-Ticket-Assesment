import React from 'react';
import { Event } from '../types/event';
import { MapPin, Calendar, Tag, DollarSign } from 'lucide-react';
import { formatDate, formatPrice } from '../utils/dateUtils';

interface EventDetailsProps {
  event: Event;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="flex gap-4 p-4 bg-neutral-800 rounded-lg">
      <img 
        src={event.posterUrl} 
        alt={event.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold mb-2">{event.name}</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Tag className="w-4 h-4" />
            <span>{event.category}</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <DollarSign className="w-4 h-4" />
            <span>{formatPrice(event.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};