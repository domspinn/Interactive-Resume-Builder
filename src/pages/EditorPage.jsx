import React, { useState } from 'react';
import ResumeEditor from '../components/ResumeEditor';
import LivePreview from '../components/LivePreview';

const EditorPage = () => {
  const [sections, setSections] = useState([]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-500">
      <div className="w-full lg:w-1/2 p-6">
        <ResumeEditor sections={sections} setSections={setSections} />
      </div>
    </div>
  );
};

export default EditorPage;
