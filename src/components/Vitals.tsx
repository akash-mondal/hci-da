import React from 'react';

// Define the type for a vital sign object
interface Vital {
  type: string;
  value: string;
  date: string;
  time: string;
}

// Define the type for the custom event detail
interface AddVitalEventDetail {
  type: string;
  value: string;
  datetime?: string; // datetime might be optional
}

export const Vitals: React.FC = () => {
  // --- HOOKS MOVED INSIDE THE COMPONENT ---
  const [vitals, setVitals] = React.useState<Vital[]>([ // Add type annotation
    { type: 'Blood Pressure', value: '120/80 mmHg', date: '2024-04-17', time: '09:00 AM' },
    { type: 'Heart Rate', value: '72 bpm', date: '2024-04-17', time: '09:00 AM' },
    { type: 'O2 Saturation', value: '98%', date: '2024-04-17', time: '09:00 AM' },
    { type: 'Temperature', value: '98.6°F', date: '2024-04-17', time: '09:00 AM' }
  ]);

  // Listen for custom event to add vital via voice
  React.useEffect(() => {
    // Type the event properly
    function handleAddVital(e: CustomEvent<AddVitalEventDetail>) {
      // Check if detail exists
      if (!e.detail) {
        console.error("AddVital event fired without detail");
        return;
      }

      // Safely handle splitting the datetime string
      const dateTimeString = e.detail.datetime || '';
      const parts = dateTimeString.split(' ');
      const date = parts[0] || 'N/A'; // Default if missing
      const time = parts.slice(1).join(' ') || 'N/A'; // Handle potential spaces in time (like AM/PM)

      setVitals(vs => [
        ...vs,
        {
          type: e.detail.type,
          value: e.detail.value,
          date: date,
          time: time,
        }
      ]);
    }

    // Add the event listener
    window.addEventListener('addVital', handleAddVital as EventListener);

    // Return the cleanup function
    return () => {
      window.removeEventListener('addVital', handleAddVital as EventListener);
    };
  }, []); // Empty dependency array: run once on mount, cleanup on unmount
  // --- END OF MOVED HOOKS ---


  // --- COMPONENT RENDER LOGIC ---
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vital Signs</h2>
      <button className="mb-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
        Record New Vital
      </button>
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
            <tr key={idx} className="border-t"> {/* Consider a unique ID for key if possible */}
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
};
