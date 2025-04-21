import React from 'react';

// Define the type for a message object
interface Message {
  from: string;
  subject: string;
  date: string;
  status: 'Read' | 'Unread'; // Use literal types if applicable
}

// Define the type for the custom event detail
interface AddMessageEventDetail {
  from: string;
  subject: string;
  date: string;
  status?: 'Read' | 'Unread'; // status might be optional in the event
}


export const Messages: React.FC = () => {
  // --- HOOKS MOVED INSIDE THE COMPONENT ---
  const [messages, setMessages] = React.useState<Message[]>([ // Add type annotation
    { from: 'Dr. Smith', subject: 'Lab Results Update', date: '2024-04-15', status: 'Unread' },
    { from: 'Clinic', subject: 'Appointment Reminder', date: '2024-04-14', status: 'Read' },
    { from: 'Pharmacy', subject: 'Prescription Ready', date: '2024-04-13', status: 'Read' }
  ]);

  // Listen for custom event to add message via voice
  React.useEffect(() => {
    // Type the event properly
    function handleAddMessage(e: CustomEvent<AddMessageEventDetail>) {
      // Check if detail exists
       if (!e.detail) {
        console.error("AddMessage event fired without detail");
        return;
      }

      setMessages(msgs => [
        ...msgs,
        {
          from: e.detail.from,
          subject: e.detail.subject,
          date: e.detail.date, // Assuming date is always provided in the event
          status: e.detail.status || 'Unread', // Default to 'Unread' if not provided
        }
      ]);
    }

    // Add the event listener
    window.addEventListener('addMessage', handleAddMessage as EventListener);

    // Return the cleanup function
    return () => {
      window.removeEventListener('addMessage', handleAddMessage as EventListener);
    };
  }, []); // Empty dependency array: run once on mount, cleanup on unmount
  // --- END OF MOVED HOOKS ---


  // --- COMPONENT RENDER LOGIC ---
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <button className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
        Send New Message
      </button>
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
            <tr key={idx} className={`border-t ${msg.status === 'Unread' ? 'font-semibold' : ''}`}> {/* Example: Make unread bold */}
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
};
