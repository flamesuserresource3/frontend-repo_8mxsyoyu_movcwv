import React, { useEffect, useMemo, useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import MonthGrid from './components/MonthGrid';
import EventList from './components/EventList';
import EventForm from './components/EventForm';

function formatKey(date) {
  return date.toISOString().slice(0, 10);
}

function monthLabel(date) {
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

function prettyDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function buildMonthDays(currentMonth) {
  const first = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startOffset = first.getDay(); // 0..6, Sunday-based
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - startOffset);

  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function App() {
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Events state keyed by yyyy-mm-dd
  const [eventsByDate, setEventsByDate] = useState(() => {
    try {
      const raw = localStorage.getItem('calendar.events');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('calendar.events', JSON.stringify(eventsByDate));
    } catch {}
  }, [eventsByDate]);

  const days = useMemo(() => buildMonthDays(currentMonth), [currentMonth]);

  const todayKey = formatKey(new Date());
  const monthText = monthLabel(currentMonth);
  const selectedKey = formatKey(selectedDate);

  const handlePrev = () => {
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  };
  const handleNext = () => {
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  };
  const handleToday = () => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  };

  const addEvent = (ev) => {
    setEventsByDate((prev) => {
      const list = prev[selectedKey] ? [...prev[selectedKey]] : [];
      list.push(ev);
      return { ...prev, [selectedKey]: list };
    });
  };

  const deleteEvent = (idx) => {
    setEventsByDate((prev) => {
      const list = prev[selectedKey] ? [...prev[selectedKey]] : [];
      list.splice(idx, 1);
      const next = { ...prev };
      if (list.length === 0) {
        delete next[selectedKey];
      } else {
        next[selectedKey] = list;
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <CalendarHeader
          monthLabel={monthText}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthGrid
              days={days}
              currentMonth={currentMonth}
              today={todayKey}
              eventsByDate={eventsByDate}
              onDayClick={(d) => setSelectedDate(d)}
            />
          </div>

          <div className="space-y-4">
            <EventForm
              selectedDateLabel={prettyDate(selectedDate)}
              onAdd={addEvent}
            />
            <EventList
              selectedDateLabel={prettyDate(selectedDate)}
              events={eventsByDate[selectedKey] || []}
              onDelete={deleteEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
