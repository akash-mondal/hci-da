import React from 'react';

const appointments = [
  { date: '2024-04-20', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Cardiology', status: 'Upcoming' },
  { date: '2024-03-15', time: '2:30 PM', doctor: 'Dr. Patel', type: 'Dermatology', status: 'Completed' },
  { date: '2024-02-10', time: '11:00 AM', doctor: 'Dr. Lee', type: 'General', status: 'Cancelled' }
];

// Accept prefilled prop
interface AppointmentsProps {
  prefilled?: { date: string; time: string } | null;
}

export const Appointments: React.FC<AppointmentsProps> = ({ prefilled }) => {
  // Local state for scheduling form
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({
    date: prefilled?.date || '',
    time: prefilled?.time || '',
    doctor: '',
    type: '',
  });

  React.useEffect(() => {
    if (prefilled && (prefilled.date || prefilled.time)) {
      setShowForm(true);
      setForm(f => ({ ...f, date: prefilled.date || '', time: prefilled.time || '' }));
    }
  }, [prefilled]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => setShowForm(true)}>
        Schedule New Appointment
      </button>
      {showForm && (
        <form className="mb-6 p-4 bg-blue-50 rounded" aria-label="Schedule Appointment">
          <div className="mb-2">
            <label className="block font-semibold">Date</label>
            <input type="text" className="border rounded p-2 w-full" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Time</label>
            <input type="text" className="border rounded p-2 w-full" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Doctor</label>
            <input type="text" className="border rounded p-2 w-full" value={form.doctor} onChange={e => setForm(f => ({ ...f, doctor: e.target.value }))} />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Type</label>
            <input type="text" className="border rounded p-2 w-full" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} />
          </div>
          <button type="button" className="mt-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800" onClick={() => setShowForm(false)}>
            Save Appointment
          </button>
        </form>
      )}
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Doctor</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{appt.date}</td>
              <td className="p-2">{appt.time}</td>
              <td className="p-2">{appt.doctor}</td>
              <td className="p-2">{appt.type}</td>
              <td className="p-2">{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
