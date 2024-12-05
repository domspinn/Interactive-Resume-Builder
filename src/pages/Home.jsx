import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for access_token in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');

    if (token) {
      setIsAuthenticated(true);
      // Optional: Store token in localStorage or state for future API calls
      localStorage.setItem('github_access_token', token);

      // Remove token from URL to clean it up
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github'; // Backend GitHub OAuth route
  };

  return (
    <div className="relative">
      {/* First Section (Welcome Section) */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 pt-20 relative">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to OneSecond</h1>
        <p className="text-lg text-gray-200 mb-8">
          {isAuthenticated
            ? 'You’re connected! Start building your resume now.'
            : 'Connect your GitHub and start building your interactive resume seamlessly.'}
        </p>

        <div className="flex flex-col items-center">
          <button
            onClick={isAuthenticated ? () => navigate('/editor') : handleGitHubLogin}
            className="px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            {isAuthenticated ? 'Build Resume' : 'Connect GitHub'}
          </button>
        </div>
      </div>

      {/* Next Section (About Section) */}
      <section
        id="about-section"
        className="min-h-screen bg-gradient-to-br from-blue-700 to-purple-900 flex flex-col items-center justify-center px-4"
      >
        <h2 className="text-4xl font-semibold text-white mb-6">About the App</h2>
        <div className="w-full max-w-md flex flex-col items-center justify-center">
          <img
            src="https://help.apple.com/assets/65E21662495F1A6C8701F50A/65E21663EF8273BE1D0C2734/en_US/29537b9a58f71e9bc8e241e1ececb17b.png"
            alt="Apple Music Stock Library"
            className="w-64 rounded-lg p-8"
          />
        </div>
        <div className="w-full max-w-3xl p-8 bg-white bg-opacity-10 rounded-lg shadow-lg text-center">
          <p className="text-gray-200">
            OneSecond is a fun and practical app where you can build your resume by connecting your GitHub, adding projects, and showcasing your skills. Start your career journey now!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
