import React from 'react';

export const Settings: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <form className="space-y-4 max-w-xl">
      <div>
        <label className="block mb-1 font-semibold">Email Notifications</label>
        <select className="w-full border rounded p-2">
          <option>Enabled</option>
          <option>Disabled</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">SMS Alerts</label>
        <select className="w-full border rounded p-2">
          <option>Enabled</option>
          <option>Disabled</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Theme</label>
        <select className="w-full border rounded p-2">
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
    </form>
  </div>
);
