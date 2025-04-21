import React from 'react';

const [medications, setMedications] = React.useState([
  { name: 'Lisinopril', dose: '10mg', frequency: 'Once daily', next: '8:00 PM', status: 'Active' },
  { name: 'Metformin', dose: '500mg', frequency: 'Twice daily', next: '9:00 PM', status: 'Active' },
  { name: 'Atorvastatin', dose: '20mg', frequency: 'Once daily', next: 'Tomorrow', status: 'Inactive' }
]);

// Listen for custom event to add medication via voice
React.useEffect(() => {
  function handleAddMedication(e: CustomEvent) {
    setMedications(meds => [
      ...meds,
      {
        name: e.detail.name,
        dose: e.detail.dose,
        frequency: e.detail.frequency,
        next: e.detail.next || '',
        status: 'Active',
      }
    ]);
  }
  window.addEventListener('addMedication', handleAddMedication as EventListener);
  return () => window.removeEventListener('addMedication', handleAddMedication as EventListener);
}, []);

export const Medications: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Medications</h2>
    <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Request Refill</button>
    <table className="w-full text-left border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Dose</th>
          <th className="p-2">Frequency</th>
          <th className="p-2">Next Dose</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {medications.map((med, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{med.name}</td>
            <td className="p-2">{med.dose}</td>
            <td className="p-2">{med.frequency}</td>
            <td className="p-2">{med.next}</td>
            <td className="p-2">{med.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
