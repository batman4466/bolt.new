import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Map from './components/Map';
import PhotoUpload from './components/PhotoUpload';

interface Complaint {
  title: string;
  description: string;
  location: [number, number];
  photo: string | null;
  timestamp: string;
}

function App() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newComplaint: Complaint = {
      title,
      description,
      location: position,
      photo,
      timestamp: new Date().toISOString(),
    };

    setComplaints([...complaints, newComplaint]);
    setSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setTitle('');
      setDescription('');
      setPhoto(null);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">Complaint Portal</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Complaint Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Brief title of your complaint"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Detailed description of the issue..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Map position={position} setPosition={setPosition} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo Evidence
                </label>
                <PhotoUpload photo={photo} setPhoto={setPhoto} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              {submitted && (
                <p className="text-green-600 font-medium">
                  Complaint submitted successfully!
                </p>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>

        {complaints.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Complaints</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {complaints.map((complaint, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-2">{complaint.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{complaint.description}</p>
                  {complaint.photo && (
                    <img
                      src={complaint.photo}
                      alt="Complaint evidence"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <p className="text-sm text-gray-500">
                    {new Date(complaint.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;