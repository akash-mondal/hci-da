import React from 'react';

const [messages, setMessages] = React.useState([
  { from: 'Dr. Smith', subject: 'Lab Results Update', date: '2024-04-15', status: 'Unread' },
  { from: 'Clinic', subject: 'Appointment Reminder', date: '2024-04-14', status: 'Read' },
  { from: 'Pharmacy', subject: 'Prescription Ready', date: '2024-04-13', status: 'Read' }
]);

// Listen for custom event to add message via voice
React.useEffect(() => {
  function handleAddMessage(e: CustomEvent) {
    setMessages(msgs => [
      ...msgs,
      {
        from: e.detail.from,
        subject: e.detail.subject,
        date: e.detail.date,
        status: e.detail.status || 'Unread',
      }
    ]);
  }
  window.addEventListener('addMessage', handleAddMessage as EventListener);
  return () => window.removeEventListener('addMessage', handleAddMessage as EventListener);
}, []);

export const Messages: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Messages</h2>
    <button className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Send New Message</button>
    <table className="w-full text-left border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">From</th>
          <th className="p-2">Subject</th>
          <th className="p-2">Date</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((msg, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{msg.from}</td>
            <td className="p-2">{msg.subject}</td>
            <td className="p-2">{msg.date}</td>
            <td className="p-2">{msg.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
