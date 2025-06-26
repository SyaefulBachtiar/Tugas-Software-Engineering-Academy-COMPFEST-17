// src/admin/components/StatCard.jsx
import React from 'react';

export default function StatCard({ title, value, description, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className={`text-4xl ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}