import React from 'react';
import { Event } from '../types/event';
import { EventCard } from './EventCard';
import { format, isToday } from 'date-fns';

interface TimelineProps {
  events: Event[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  // Group events by date
  const eventsByDate = events.reduce((acc: Record<string, Event[]>, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(eventsByDate).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="space-y-8 block md:hidden">
      {sortedDates.map((date) => (
        <div key={date} className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-neutral-700" />
          
          {/* Date header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-neutral-700 relative z-10" />
              <h2 className="text-xl font-semibold ml-6">
                {isToday(new Date(date)) ? 'Today' : format(new Date(date), 'MMMM d')}
              </h2>
            </div>
            <button className="text-orange-500 text-sm font-medium">
              see all
            </button>
          </div>

          {/* Events for this date */}
          <div className="ml-12 space-y-4">
            {eventsByDate[date].map((event) => (
              <EventCard key={event.id} event={event} variant="timeline" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};