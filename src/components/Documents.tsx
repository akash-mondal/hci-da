import React from 'react';

const documents = [
  { name: 'Discharge Summary', date: '2024-03-01', type: 'PDF', status: 'Available' },
  { name: 'Imaging Report', date: '2024-02-20', type: 'PDF', status: 'Available' },
  { name: 'Insurance Card', date: '2023-12-15', type: 'Image', status: 'Uploaded' }
];

export const Documents: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Documents</h2>
    <button className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Upload New Document</button>
    <table className="w-full text-left border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Date</th>
          <th className="p-2">Type</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{doc.name}</td>
            <td className="p-2">{doc.date}</td>
            <td className="p-2">{doc.type}</td>
            <td className="p-2">{doc.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
