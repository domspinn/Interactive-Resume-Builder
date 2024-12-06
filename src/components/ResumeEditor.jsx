import React, { useState, useEffect } from 'react';
import LivePreview from './LivePreview';

const ResumeEditor = () => {
  const [sections, setSections] = useState([]);
  const [repos, setRepos] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });
  const [isPersonalInfoSubmitted, setIsPersonalInfoSubmitted] = useState(false);

  const handlePersonalInfoSubmit = () => {
    setSections([
      {
        id: 1,
        title: 'Personal Information',
        content: `Name: ${personalInfo.name}\nEmail: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nCity: ${personalInfo.city}`,
      },
    ]);
    setIsPersonalInfoSubmitted(true);
  };

  useEffect(() => {
    // Simulate fetching GitHub repos
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Resume Editor Section */}
      <div className="w-full lg:w-1/2 p-6 bg-gradient-to-br from-blue-500 to-green-500">
        <h2 className="text-3xl font-bold text-white mb-6">Resume Editor</h2>

        {!isPersonalInfoSubmitted ? (
          <div className="p-6 bg-white rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Enter Your Personal Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="City"
                value={personalInfo.city}
                onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handlePersonalInfoSubmit}
                className="px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.id} className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={`Enter content for ${section.title}`}
                value={section.content}
                onChange={(e) =>
                  setSections(
                    sections.map((s) => (s.id === section.id ? { ...s, content: e.target.value } : s))
                  )
                }
              />
            </div>
          ))
        )}
      </div>

      {/* Live Preview Section */}
      <div className="w-full lg:w-1/2 p-6 bg-gray-100">
        <LivePreview sections={sections} />
      </div>
    </div>
  );
};

export default ResumeEditor;
