// src/admin/components/DateRangePicker.jsx
import React from 'react';

export default function DateRangePicker({ startDate, setStartDate, endDate, setEndDate }) {
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value ? new Date(e.target.value) : null);
  };

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value ? new Date(e.target.value) : null;
    // Set end date to end of day to include all data for that day
    if (selectedDate) {
      selectedDate.setHours(23, 59, 59, 999);
    }
    setEndDate(selectedDate);
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="startDate" className="text-gray-700">Dari:</label>
        <input
          type="date"
          id="startDate"
          className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="endDate" className="text-gray-700">Sampai:</label>
        <input
          type="date"
          id="endDate"
          className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          onChange={handleEndDateChange}
        />
      </div>
      {(startDate || endDate) && (
        <button
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
          }}
          className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset Filter
        </button>
      )}
    </div>
  );
}