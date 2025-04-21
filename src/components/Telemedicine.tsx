import React from 'react';

export const Telemedicine: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Telemedicine</h2>
    <div className="mb-4 p-4 bg-blue-50 rounded">
      <p className="mb-2">Your next telemedicine session:</p>
      <div className="font-semibold">April 20, 2024 - 10:00 AM with Dr. Smith</div>
      <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Start Session</button>
    </div>
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Past Sessions</h3>
      <ul className="list-disc pl-6">
        <li>March 3, 2024 - Dr. Lee (Summary Available)</li>
        <li>February 1, 2024 - Dr. Patel (Summary Available)</li>
      </ul>
    </div>
  </div>
);
