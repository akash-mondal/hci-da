import React from 'react';

// Define the type for a medication object for better type safety
interface Medication {
  name: string;
  dose: string;
  frequency: string;
  next: string;
  status: 'Active' | 'Inactive'; // Use literal types for status if possible
}

// Define the type for the custom event detail
interface AddMedicationEventDetail {
  name: string;
  dose: string;
  frequency: string;
  next?: string; // next might be optional
}


export const Medications: React.FC = () => {
  // --- HOOKS MOVED INSIDE THE COMPONENT ---
  const [medications, setMedications] = React.useState<Medication[]>([ // Add type annotation for state
    { name: 'Lisinopril', dose: '10mg', frequency: 'Once daily', next: '8:00 PM', status: 'Active' },
    { name: 'Metformin', dose: '500mg', frequency: 'Twice daily', next: '9:00 PM', status: 'Active' },
    { name: 'Atorvastatin', dose: '20mg', frequency: 'Once daily', next: 'Tomorrow', status: 'Inactive' }
  ]);

  // Listen for custom event to add medication via voice
  React.useEffect(() => {
    // Type the event properly
    function handleAddMedication(e: CustomEvent<AddMedicationEventDetail>) {
      // Check if detail exists (good practice)
      if (!e.detail) {
        console.error("AddMedication event fired without detail");
        return;
      }

      setMedications(meds => [
        ...meds,
        {
          name: e.detail.name,
          dose: e.detail.dose,
          frequency: e.detail.frequency,
          next: e.detail.next || 'N/A', // Provide a default if next is missing
          status: 'Active',
        }
      ]);
    }

    // Add the event listener
    window.addEventListener('addMedication', handleAddMedication as EventListener);

    // Return the cleanup function
    return () => {
      window.removeEventListener('addMedication', handleAddMedication as EventListener);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount
  // --- END OF MOVED HOOKS ---


  // --- COMPONENT RENDER LOGIC ---
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Medications</h2>
      <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Request Refill
      </button>
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
            <tr key={idx} className="border-t"> {/* Using index as key is okay for static lists, but prefer a unique ID if available */}
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
};
