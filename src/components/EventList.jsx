import React from 'react';
import { Clock } from 'lucide-react';

function EventList({ selectedDateLabel, events, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Events on {selectedDateLabel}</h3>
        <span className="text-xs text-gray-500">{events.length} total</span>
      </div>
      {events.length === 0 ? (
        <p className="text-sm text-gray-500">No events yet. Add one using the form.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((ev, idx) => (
            <li key={idx} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-gray-50">
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 text-indigo-600" size={16} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{ev.title}</p>
                  {ev.time && (
                    <p className="text-xs text-gray-600">{ev.time}</p>
                  )}
                </div>
              </div>
              <button
                className="text-xs text-red-600 hover:text-red-700"
                onClick={() => onDelete(idx)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
