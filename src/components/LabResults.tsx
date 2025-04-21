import React from 'react';

const labResults = [
  { test: 'CBC', date: '2024-03-10', result: 'Normal', details: 'All values within normal range.' },
  { test: 'Lipid Panel', date: '2024-03-10', result: 'Borderline High', details: 'LDL slightly elevated.' },
  { test: 'A1C', date: '2024-03-10', result: '6.5%', details: 'Monitor glucose control.' }
];

export const LabResults: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Lab Results</h2>
    <table className="w-full text-left border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Test</th>
          <th className="p-2">Date</th>
          <th className="p-2">Result</th>
          <th className="p-2">Details</th>
        </tr>
      </thead>
      <tbody>
        {labResults.map((lab, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{lab.test}</td>
            <td className="p-2">{lab.date}</td>
            <td className="p-2">{lab.result}</td>
            <td className="p-2">{lab.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
