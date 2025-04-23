
import React from 'react';

function SubmitButton({ onClick }) {
  return (
    <div className="text-center mt-8">
      <button
        onClick={onClick}
        className="bg-blue-700 text-white px-6 py-3 rounded text-lg hover:bg-blue-600"
      >
        Submit Reflection
      </button>
    </div>
  );
}

export default SubmitButton;
