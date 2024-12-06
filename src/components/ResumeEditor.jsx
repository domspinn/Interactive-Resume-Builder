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
  const [currentStep, setCurrentStep] = useState('personalInfo'); // Tracks the current section: 'personalInfo', 'repositories', 'workExperience'

  // Fetch GitHub repositories
  const fetchRepos = async () => {
    const token = localStorage.getItem('github_access_token');
    if (!token) return;

    try {
      const response = await fetch('https://api.github.com/user/repos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  // Handle personal information submission
  const handlePersonalInfoSubmit = () => {
    setSections([
      {
        id: 1,
        title: 'Personal Information',
        content: `Name: ${personalInfo.name}\nEmail: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nCity: ${personalInfo.city}`,
      },
    ]);
    setIsPersonalInfoSubmitted(true);
    setCurrentStep('repositories'); // Move to the repositories step
    fetchRepos();
  };

  // Handle moving to the next step
  const handleNextStep = () => {
    setCurrentStep('workExperience');
  };

  const handleAddRepoSection = (repo) => {
    setSections([
      ...sections,
      { id: sections.length + 1, title: 'Project', content: repo.name },
    ]);
  };

  const handleAddWorkExperience = (content) => {
    setSections([
      ...sections,
      { id: sections.length + 1, title: 'Work Experience', content },
    ]);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gray-50">
      {/* Resume Editor Section */}
      <div className="w-full lg:w-2/3 p-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-white mb-8">Resume Editor</h2>

        {currentStep === 'personalInfo' && (
          <div className="p-6 bg-white rounded shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Enter Your Personal Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="City"
                value={personalInfo.city}
                onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <button
                onClick={handlePersonalInfoSubmit}
                className="w-full py-3 mt-4 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {currentStep === 'repositories' && (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Your GitHub Repositories</h3>
            {repos.length > 0 ? (
              <ul className="bg-white rounded shadow-md p-4 mb-4">
                {repos.map((repo) => (
                  <li
                    key={repo.id}
                    className="cursor-pointer text-blue-700 hover:underline"
                    onClick={() => handleAddRepoSection(repo)}
                  >
                    {repo.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No repositories found or not authenticated.</p>
            )}
            <button
              onClick={handleNextStep}
              className="w-full py-3 mt-4 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              Done
            </button>
          </div>
        )}

        {currentStep === 'workExperience' && (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Enter Your Work Experience</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Describe your work experience..."
              onBlur={(e) => handleAddWorkExperience(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Live Preview Section */}
      <div className="w-full lg:w-1/3 p-8 bg-gray-100 rounded-lg shadow-md">
        <LivePreview sections={sections} />
      </div>
    </div>
  );
};

export default ResumeEditor;
