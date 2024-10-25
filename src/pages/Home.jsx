// import React, { useState } from 'react';
// import axios from 'axios';

// function ResumeUpload() {
//   const [file, setFile] = useState(null);
//   const [response, setResponse] = useState('');
//   const [modal, setModal] = useState(false);

//   const toggleModal = () => setModal(!modal);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please upload a file");

//     const formData = new FormData();
//     formData.append('pdfFile', file);

//     try {
//       const res = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setResponse(res.data.recommendations || 'No recommendations found.');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Error uploading file, please try again.');
//     }
//   };

//   return (
//     <div>
//       <button onClick={toggleModal} className="bg-indigo-600 text-white px-4 py-2 rounded">Upload Resume</button>
//       {modal && (
//         <div className="modal">
//           <div onClick={toggleModal} className="overlay"></div>
//           <div className="modal-content">
//             <form onSubmit={handleSubmit} className="flex flex-col">
//               <h2 className="text-lg font-semibold">Choose Resume</h2>
//               <input
//                 type="file"
//                 accept="application/pdf"
//                 onChange={handleFileChange}
//                 className="mt-4 border rounded p-2"
//               />
//               <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Upload</button>
//             </form>
//             <button onClick={toggleModal} className="mt-4 text-red-500">CLOSE</button>
//           </div>
//         </div>
//       )}
//       {response && <div className="mt-4 text-gray-700">{response}</div>}
//     </div>
//   );
// }

// export default ResumeUpload;

import React, { useState } from 'react';
import axios from 'axios';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file");

    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data.recommendations || 'No recommendations found.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file, please try again.');
    }
  };

  // Render JSON response as structured elements
  const renderResponse = (data) => {
    if (typeof data === 'string') return <p>{data}</p>;

    return (
      <div>
        <h3 className="font-semibold text-lg">Career Path Recommendations:</h3>
        {data.careerPathRecommendations && data.careerPathRecommendations.map((item, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold">{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
        <h3 className="font-semibold text-lg">Skill Gap Analysis:</h3>
        {data.skillGapAnalysis && data.skillGapAnalysis.map((skill, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold">{skill.skill}</h4>
            <p>{skill.description}</p>
            <h5 className="font-semibold">Resources:</h5>
            <ul className="list-disc ml-6">
              {skill.resources.map((resource, idx) => (
                <li key={idx}>{resource}</li>
              ))}
            </ul>
            <h5 className="font-semibold">Recommended Projects:</h5>
            <ul className="list-disc ml-6">
              {skill.recommendedProjects.map((project, idx) => (
                <li key={idx}>{project}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <button onClick={toggleModal} className="bg-indigo-600 text-white px-4 py-2 rounded">Upload Resume</button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <h2 className="text-lg font-semibold">Choose Resume</h2>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="mt-4 border rounded p-2"
              />
              <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Upload</button>
            </form>
            <button onClick={toggleModal} className="mt-4 text-red-500">CLOSE</button>
          </div>
        </div>
      )}
      {response && (
        <div className="mt-4 text-gray-700">
          {renderResponse(response)}
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
