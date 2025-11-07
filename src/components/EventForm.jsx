import React, { useState } from 'react';

function EventForm({ selectedDateLabel, onAdd }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), time });
    setTitle('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Add event on {selectedDateLabel}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <input
          type="text"
          className="sm:col-span-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="time"
          className="sm:col-span-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          type="submit"
          className="sm:col-span-1 inline-flex justify-center items-center rounded-lg bg-indigo-600 text-white text-sm font-medium px-3 py-2 hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default EventForm;
