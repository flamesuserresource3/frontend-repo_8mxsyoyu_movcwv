import React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function MonthGrid({ days, currentMonth, today, eventsByDate, onDayClick }) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 text-sm font-medium text-gray-500 bg-gray-50">
        {weekdays.map((d) => (
          <div key={d} className="px-3 py-2 text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 auto-rows-[minmax(90px,1fr)]">
        {days.map((day) => {
          const key = day.toISOString().slice(0, 10);
          const isToday = key === today;
          const inMonth = day.getMonth() === currentMonth.getMonth();
          const events = eventsByDate[key] || [];
          return (
            <button
              key={key}
              onClick={() => onDayClick(day)}
              className={classNames(
                'relative p-2 border-t border-l border-gray-100 text-left group focus:outline-none',
                !inMonth && 'bg-gray-50 text-gray-400',
                inMonth && 'bg-white',
                'hover:bg-indigo-50/40'
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={classNames(
                    'inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium',
                    isToday ? 'bg-indigo-600 text-white' : 'text-gray-700'
                  )}
                >
                  {day.getDate()}
                </span>
                {events.length > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    {events.length}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-col gap-1">
                {events.slice(0, 2).map((e, idx) => (
                  <div
                    key={idx}
                    className="truncate text-xs px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100"
                  >
                    {e.title}
                  </div>
                ))}
                {events.length > 2 && (
                  <div className="text-[11px] text-gray-500">+{events.length - 2} more</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MonthGrid;
