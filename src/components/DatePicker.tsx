import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const handlePrevMonth = () => {
    const prevMonth = new Date(selectedDate.setMonth(selectedDate.getMonth() - 1));
    onDateChange(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1));
    onDateChange(nextMonth);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
      <button
        onClick={handlePrevMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      
      <h2 className="text-xl font-semibold text-gray-900">
        {format(selectedDate, 'MMMM yyyy')}
      </h2>
      
      <button
        onClick={handleNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};