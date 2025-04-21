import React, { useState } from 'react';
import { 
  Activity, Bell, Calendar, FileText, Heart, 
  Menu, MessageSquare, Pill, Settings, User, 
  VolumeX, Volume2, ChevronRight, Clock, 
  Clipboard, Phone, AlertCircle, Brain, CalendarCheck
} from 'lucide-react';
import { useVoiceNavigation } from '../hooks/useVoiceNavigation';
import toast, { Toaster } from 'react-hot-toast';
import { Appointments } from './Appointments';
import { Medications } from './Medications';
import { Vitals } from './Vitals';
import { LabResults } from './LabResults';
import { Messages } from './Messages';
import { Documents } from './Documents';
import { MentalHealth } from './MentalHealth';
import { Telemedicine } from './Telemedicine';
import { EmergencyInfo } from './EmergencyInfo';
import { Settings as SettingsPage } from './Settings';
import * as chrono from 'chrono-node';

const sections = {
  overview: 'Overview',
  appointments: 'Appointments',
  medications: 'Medications',
  vitals: 'Vital Signs',
  labResults: 'Lab Results',
  messages: 'Messages',
  documents: 'Documents',
  mentalHealth: 'Mental Health',
  telemedicine: 'Telemedicine',
  emergencyInfo: 'Emergency Info',
  settings: 'Settings'
};

export const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [prefilledAppointment, setPrefilledAppointment] = useState<{date: string, time: string} | null>(null);
  const { isListening, transcript, startListening, stopListening } = useVoiceNavigation();

  const handleVoiceCommand = () => {
    if (!transcript) return;
    
    const command = transcript.toLowerCase();
    let commandHandled = false;

    // Complex appointment scheduling (e.g., "schedule an appointment for next monday at 8 pm")
    if (command.includes('schedule an appointment for')) {
      const datePhrase = command.split('schedule an appointment for')[1];
      const parsedDate = chrono.parseDate(datePhrase, new Date(), { forwardDate: true });
      if (parsedDate) {
        setActiveSection('appointments');
        setPrefilledAppointment({ date: parsedDate.toLocaleDateString(), time: parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
        toast.success(`Prefilled appointment for ${parsedDate.toLocaleString()}`);
        commandHandled = true;
      } else {
        toast.error('Could not parse the appointment date/time.');
      }
    }

    // Custom voice commands for appointment creation
    if (!commandHandled && command.match(/add appointment/)) {
      // Example: "add appointment for 2025-05-01 10am with Dr. Smith type Cardiology"
      const match = command.match(/add appointment for (.+?) with (.+?) type (.+)/);
      if (match) {
        const dateTime = match[1].trim();
        const doctor = match[2].trim();
        const type = match[3].trim();
        setActiveSection('appointments');
        setPrefilledAppointment({ date: dateTime.split(' ')[0], time: dateTime.split(' ')[1] });
        toast.success(`Added appointment for ${dateTime} with ${doctor} (${type})`);
        commandHandled = true;
      }
    }

    // Custom voice commands for medication entry
    if (!commandHandled && command.match(/add medication/)) {
      // Example: "add medication Lisinopril dose 10mg frequency once daily"
      const match = command.match(/add medication (.+?) dose (.+?) frequency (.+)/);
      if (match) {
        const name = match[1].trim();
        const dose = match[2].trim();
        const frequency = match[3].trim();
        setActiveSection('medications');
        window.dispatchEvent(new CustomEvent('addMedication', { detail: { name, dose, frequency } }));
        toast.success(`Added medication: ${name}, ${dose}, ${frequency}`);
        commandHandled = true;
      }
    }

    // Custom voice commands for vital sign entry
    if (!commandHandled && command.match(/add vital/)) {
      // Example: "add vital blood pressure value 120/80 mmhg at 2025-05-01 09:00"
      const match = command.match(/add vital (.+?) value (.+?) at (.+)/);
      if (match) {
        const type = match[1].trim();
        const value = match[2].trim();
        const datetime = match[3].trim();
        setActiveSection('vitals');
        window.dispatchEvent(new CustomEvent('addVital', { detail: { type, value, datetime } }));
        toast.success(`Added vital: ${type} = ${value} at ${datetime}`);
        commandHandled = true;
      }
    }

    // Custom voice commands for message entry
    if (!commandHandled && command.match(/send message/)) {
      // Example: "send message to Dr. Smith subject Lab Results Update"
      const match = command.match(/send message to (.+?) subject (.+)/);
      if (match) {
        const from = match[1].trim();
        const subject = match[2].trim();
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        setActiveSection('messages');
        window.dispatchEvent(new CustomEvent('addMessage', { detail: { from, subject, date, status: 'Unread' } }));
        toast.success(`Message sent to ${from}: ${subject}`);
        commandHandled = true;
      }
    }

    // Navigation commands - check for both "go to X" and just "X"
    if (!commandHandled) {
      Object.entries(sections).forEach(([key, value]) => {
        const sectionName = value.toLowerCase();
        if (command.includes(`go to ${sectionName}`) || command.includes(sectionName)) {
          setActiveSection(key);
          toast.success(`Navigating to ${value}`);
          commandHandled = true;
        }
      });
    }

    // Action commands
    if (!commandHandled) {
      if (command.includes('schedule appointment')) {
        setActiveSection('appointments');
        toast.success('Opening appointment scheduler...');
      } else if (command.includes('record symptoms')) {
        setActiveSection('documents');
        toast.success('Starting symptom recording...');
      } else if (command.includes('request refill') || command.includes('show medications')) {
        setActiveSection('medications');
        toast.success('Opening medications panel...');
      } else if (command.includes('start telemedicine')) {
        setActiveSection('telemedicine');
        toast.success('Preparing telemedicine session...');
      } else if (command.includes('show emergency info')) {
        setActiveSection('emergencyInfo');
        toast.success('Displaying emergency information...');
      } else if (command.includes('record vital signs')) {
        setActiveSection('vitals');
        toast.success('Opening vital signs recorder...');
      } else if (command.includes('send message')) {
        setActiveSection('messages');
        toast.success('Opening messaging center...');
      }
    }
  };

  React.useEffect(() => {
    if (transcript) {
      handleVoiceCommand();
    }
  }, [transcript]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Healthcare Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-full ${isListening ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}
              title={isListening ? 'Stop voice commands' : 'Start voice commands'}
            >
              {isListening ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-sm transition-all duration-300 h-[calc(100vh-4rem)]`}>
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview', icon: Activity, label: 'Overview' },
              { id: 'appointments', icon: Calendar, label: 'Appointments' },
              { id: 'medications', icon: Pill, label: 'Medications' },
              { id: 'vitals', icon: Heart, label: 'Vital Signs' },
              { id: 'labResults', icon: FileText, label: 'Lab Results' },
              { id: 'messages', icon: MessageSquare, label: 'Messages' },
              { id: 'documents', icon: Clipboard, label: 'Documents' },
              { id: 'mentalHealth', icon: Brain, label: 'Mental Health' },
              { id: 'telemedicine', icon: Phone, label: 'Telemedicine' },
              { id: 'emergencyInfo', icon: AlertCircle, label: 'Emergency Info' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors
                  ${activeSection === id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span className="ml-3">{label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Patient Info */}
            <div className="flex items-center gap-2 mb-6">
              <User size={24} className="text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold">Sarah Johnson</h2>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Patient ID: P-123456</span>
                  <span>DOB: 05/15/1985</span>
                  <span>Blood Type: A+</span>
                </div>
              </div>
            </div>

            {/* Main Section Rendering */}
            {activeSection === 'overview' && (
              <>
                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <button className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <CalendarCheck className="text-blue-600" size={20} />
                    <span className="text-blue-700">Schedule Appointment</span>
                  </button>
                  <button className="flex items-center gap-2 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Pill className="text-green-600" size={20} />
                    <span className="text-green-700">Request Refill</span>
                  </button>
                  <button className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <Phone className="text-purple-600" size={20} />
                    <span className="text-purple-700">Start Telemedicine</span>
                  </button>
                  <button className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <MessageSquare className="text-orange-600" size={20} />
                    <span className="text-orange-700">Message Provider</span>
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-600">Next Appointment</h3>
                    <p className="mt-2 text-lg font-semibold">Mar 15, 2024 - 2:30 PM</p>
                    <p className="text-sm text-gray-600">Dr. Smith - Cardiology</p>
                    <div className="mt-2 flex items-center text-blue-600">
                      <Clock size={16} className="mr-1" />
                      <span className="text-sm">Reminder set</span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-green-600">Latest Vital Signs</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-lg font-semibold">BP: 120/80 mmHg</p>
                      <p className="text-lg font-semibold">Heart Rate: 72 bpm</p>
                      <p className="text-lg font-semibold">O2 Sat: 98%</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Updated: Today 9:00 AM</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-purple-600">Medication Schedule</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="font-semibold">Lisinopril 10mg</p>
                        <p className="text-sm text-gray-600">Next dose: 8:00 PM</p>
                      </div>
                      <div>
                        <p className="font-semibold">Metformin 500mg</p>
                        <p className="text-sm text-gray-600">Next dose: 9:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Comprehensive Blood Panel', date: 'Mar 10, 2024', type: 'Lab Result', status: 'New Results Available', icon: FileText, color: 'text-blue-600' },
                      { title: 'Dr. Smith - Cardiology Follow-up', date: 'Mar 8, 2024', type: 'Appointment', status: 'Completed', icon: Calendar, color: 'text-green-600' },
                      { title: 'Lisinopril Prescription', date: 'Mar 5, 2024', type: 'Medication', status: 'Refill Available', icon: Pill, color: 'text-purple-600' },
                      { title: 'Telemedicine Consultation', date: 'Mar 3, 2024', type: 'Virtual Visit', status: 'Summary Available', icon: Phone, color: 'text-orange-600' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                          <activity.icon className={activity.color} size={20} />
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm mr-2">{activity.status}</span>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {activeSection === 'appointments' && <Appointments prefilled={prefilledAppointment} />}
            {activeSection === 'medications' && <Medications />}
            {activeSection === 'vitals' && <Vitals />}
            {activeSection === 'labResults' && <LabResults />}
            {activeSection === 'messages' && <Messages />}
            {activeSection === 'documents' && <Documents />}
            {activeSection === 'mentalHealth' && <MentalHealth />}
            {activeSection === 'telemedicine' && <Telemedicine />}
            {activeSection === 'emergencyInfo' && <EmergencyInfo />}
            {activeSection === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};