import React from 'react';

const assessments = [
  { date: '2024-04-10', type: 'PHQ-9', score: '5 (Mild)', notes: 'Follow up in 3 months.' },
  { date: '2024-03-05', type: 'GAD-7', score: '3 (Minimal)', notes: 'No intervention needed.' }
];

export const MentalHealth: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Mental Health</h2>
    <button className="mb-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">Record Assessment</button>
    <table className="w-full text-left border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Date</th>
          <th className="p-2">Type</th>
          <th className="p-2">Score</th>
          <th className="p-2">Notes</th>
        </tr>
      </thead>
      <tbody>
        {assessments.map((assess, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{assess.date}</td>
            <td className="p-2">{assess.type}</td>
            <td className="p-2">{assess.score}</td>
            <td className="p-2">{assess.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
