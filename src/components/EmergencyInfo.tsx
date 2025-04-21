import React from 'react';

export const EmergencyInfo: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Emergency Info</h2>
    <div className="mb-4 p-4 bg-red-50 rounded">
      <p className="mb-2 font-semibold">Emergency Contacts:</p>
      <ul className="list-disc pl-6">
        <li>John Johnson (Spouse): +1 555-123-4567</li>
        <li>Jane Doe (Friend): +1 555-987-6543</li>
      </ul>
    </div>
    <div className="mb-4 p-4 bg-yellow-50 rounded">
      <p className="mb-2 font-semibold">Allergies:</p>
      <ul className="list-disc pl-6">
        <li>Penicillin</li>
        <li>Peanuts</li>
      </ul>
    </div>
    <div className="p-4 bg-blue-50 rounded">
      <p className="mb-2 font-semibold">Medical Conditions:</p>
      <ul className="list-disc pl-6">
        <li>Hypertension</li>
        <li>Type 2 Diabetes</li>
      </ul>
    </div>
  </div>
);
