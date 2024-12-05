import React, { useState, useEffect } from 'react';
import LivePreview from './LivePreview';

const ResumeEditor = () => {
  const [sections, setSections] = useState([]);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });
  const [isPersonalInfoSubmitted, setIsPersonalInfoSubmitted] = useState(false);

  // Fetch repositories from GitHub
  const fetchRepos = async () => {
    try {
      const token = localStorage.getItem('github_access_token');
      if (!token) {
        console.error('GitHub access token is missing');
        return;
      }

      const response = await fetch('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: `New Section ${sections.length + 1}`,
      content: '',
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id, newContent) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
    setSections([
      ...sections,
      { id: sections.length + 1, title: 'Project', content: repo.name },
    ]);
  };

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
    fetchRepos();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Resume Editor Section */}
      <div className="w-full lg:w-1/2 p-6 bg-gradient-to-br from-blue-500 to-green-500">
        <h2 className="text-3xl font-bold text-white mb-6">Resume Editor</h2>

        {!isPersonalInfoSubmitted ? (
          <div className="p-6 bg-white rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Enter Your Personal Information
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={personalInfo.name}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, phone: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="City"
                value={personalInfo.city}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, city: e.target.value })
                }
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
          <>
            {sections.map((section) => (
              <div key={section.id} className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {section.title}
                </h3>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder={`Enter content for ${section.title}`}
                  value={section.content}
                  onChange={(e) => updateSection(section.id, e.target.value)}
                />
              </div>
            ))}
            <button
              onClick={addSection}
              className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              Add New Section
            </button>
          </>
        )}

        {/* Repository Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Your GitHub Repositories</h3>
          {repos.length > 0 ? (
            <ul className="bg-white rounded shadow-md p-4">
              {repos.map((repo) => (
                <li
                  key={repo.id}
                  className="cursor-pointer text-blue-700 hover:underline"
                  onClick={() => handleRepoSelect(repo)}
                >
                  {repo.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">Fetching repositories...</p>
          )}
        </div>
      </div>

      {/* Live Preview Section */}
      <div className="w-full lg:w-1/2 p-6 bg-gray-100 flex items-center justify-center">
        <LivePreview sections={sections} />
      </div>
    </div>
  );
};

export default ResumeEditor;
