import React from 'react';

const LivePreview = ({ sections }) => {
  return (
    <div className="w-full max-w-lg bg-white shadow-xl rounded-md p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Name</h1>
        <p className="text-gray-600">yourname@example.com | (123) 456-7890</p>
      </header>
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id}>
            <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-1">
              {section.title}
            </h2>
            <p className="text-gray-600 mt-2">{section.content || 'No content added yet.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePreview;
