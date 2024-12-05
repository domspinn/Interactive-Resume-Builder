import React, { useState } from 'react';
import ResumeEditor from '../components/ResumeEditor';
import LivePreview from '../components/LivePreview';

const EditorPage = () => {
  const [sections, setSections] = useState([]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="w-full lg:w-1/2 p-6">
        <ResumeEditor sections={sections} setSections={setSections} />
      </div>
      <div className="w-full lg:w-1/2 p-6 bg-white">
        <LivePreview sections={sections} />
      </div>
    </div>
  );
};

export default EditorPage;
