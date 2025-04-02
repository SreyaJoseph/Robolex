import { useState } from 'react';
import axios from 'axios';
import FileUpload from '../components/FileUpload';

export default function Home() {
  const [text, setText] = useState('');

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData);
      setText(response.data.text);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="container">
      <h1>Reading Assistant</h1>
      <FileUpload onUpload={handleUpload} />
      {text && <a href={`/reading?text=${encodeURIComponent(text)}`}>Start Reading</a>}
    </div>
  );
}
