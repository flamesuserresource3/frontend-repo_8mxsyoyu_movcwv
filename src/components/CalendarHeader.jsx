import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

function CalendarHeader({ monthLabel, onPrev, onNext, onToday }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
          <Calendar size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          {monthLabel}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="hidden sm:inline-flex px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow transition"
        >
          Today
        </button>
        <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
          <button
            onClick={onPrev}
            className="p-2 hover:bg-gray-50 focus:outline-none"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <button
            onClick={onNext}
            className="p-2 hover:bg-gray-50 focus:outline-none"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarHeader;
