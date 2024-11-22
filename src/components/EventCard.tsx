import React from 'react';
import { MapPin } from 'lucide-react';
import { Event } from '../types/event';
import { formatPrice } from '../utils/dateUtils';

interface EventCardProps {
  event: Event;
  variant?: 'calendar' | 'timeline';
}

export const EventCard: React.FC<EventCardProps> = ({ event, variant = 'calendar' }) => {
  if (variant === 'timeline') {
    return (
      <div className="bg-neutral-800 rounded-xl p-4">
        <div className="flex gap-4">
          <img
            src={event.posterUrl}
            alt={event.name}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
            <div className="inline-block px-4 py-1 bg-[#5C3D2E] text-white rounded-full text-sm mb-2">
              {event.category}
            </div>
            <div className="flex items-center text-neutral-400 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{event.location}</span>
            </div>
            <div className="text-white font-medium mt-1">
              {formatPrice(event.price)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calendar variant remains unchanged
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={event.posterUrl}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full">
          {formatPrice(event.price)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{event.name}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            {event.category}
          </div>
        </div>
      </div>
    </div>
  );
};