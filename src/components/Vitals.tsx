import React from 'react';

const [vitals, setVitals] = React.useState([
  { type: 'Blood Pressure', value: '120/80 mmHg', date: '2024-04-17', time: '09:00 AM' },
  { type: 'Heart Rate', value: '72 bpm', date: '2024-04-17', time: '09:00 AM' },
  { type: 'O2 Saturation', value: '98%', date: '2024-04-17', time: '09:00 AM' },
  { type: 'Temperature', value: '98.6°F', date: '2024-04-17', time: '09:00 AM' }
]);

// Listen for custom event to add vital via voice
React.useEffect(() => {
  function handleAddVital(e: CustomEvent) {
    const [date, time] = (e.detail.datetime || '').split(' ');
    setVitals(vs => [
      ...vs,
      {
        type: e.detail.type,
        value: e.detail.value,
        date: date || '',
        time: time || '',
      }
    ]);
  }
  window.addEventListener('addVital', handleAddVital as EventListener);
  return () => window.removeEventListener('addVital', handleAddVital as EventListener);
}, []);

export const Vitals: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Vital Signs</h2>
    <button className="mb-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Record New Vital</button>
    <table className="w-full text-left border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Type</th>
          <th className="p-2">Value</th>
          <th className="p-2">Date</th>
          <th className="p-2">Time</th>
        </tr>
      </thead>
      <tbody>
        {vitals.map((vital, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{vital.type}</td>
            <td className="p-2">{vital.value}</td>
            <td className="p-2">{vital.date}</td>
            <td className="p-2">{vital.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
