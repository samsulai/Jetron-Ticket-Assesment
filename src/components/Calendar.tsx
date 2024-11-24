import React, { useState } from 'react';
import { Event } from '../types/event';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameMonth, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';
import { EventDetails } from './EventDetails';

interface CalendarProps {
  events: Event[];
}

export const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      format(new Date(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1)); 
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1)); 
  };

  return (
    <div className="max-w-7xl mx-auto p-8 hidden md:block">
      <div className="flex items-center w-1/2 mb-8 justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousMonth}
              className="p-1 hover:bg-neutral-800 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-neutral-800 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold flex-end">Event Calendar</h1>
      </div>

      <div className="calendar-grid">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center font-medium text-sm">
            {day}
          </div>
        ))}

        {daysInMonth.map(date => {
          const dayEvents = getEventsForDate(date);
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isCurrentDay = isToday(date);

          return (
            <Popover key={date.toString()} className="relative">
              <Popover.Button 
                className={`calendar-day w-full text-left ${
                  !isCurrentMonth ? 'opacity-50' : ''
                } ${
                  isCurrentDay ? 'ring-2 ring-[#ae4824]' : ''
                } hover:bg-neutral-800 transition-colors ui-open:bg-neutral-800`}
              >
                <div className="calendar-day-header">
                  {format(date, 'd')}
                </div>
                
                {dayEvents.length > 0 ? (
                  <>
                    <div className="event-posters">
                      {dayEvents.slice(0, 4).map(event => (
                        <div key={event.id} className="event-poster">
                          <img src={event.posterUrl} alt={event.name} />
                        </div>
                      ))}
                    </div>
                    <div className={`event-count ${dayEvents.length > 0 ? 'event-count-active' : 'event-count-none'}`}>
                      {dayEvents.length} Events
                    </div>
                  </>
                ) : (
                  <div className="event-count event-count-none">
                    No events
                  </div>
                )}
              </Popover.Button>

              <Transition
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-150 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-4">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-neutral-900 p-4">
                      <div className="mb-2 text-lg font-semibold">
                        {format(date, 'MMMM d, yyyy')}
                      </div>
                      <div className="space-y-4">
                        {dayEvents.map(event => (
                          <EventDetails key={event.id} event={event} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          );
        })}
      </div>
    </div>
  );
};
