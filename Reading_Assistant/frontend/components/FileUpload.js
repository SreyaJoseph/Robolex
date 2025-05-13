export default function FileUpload({ onUpload }) {
    const handleChange = (event) => {
      if (event.target.files.length > 0) {
        onUpload(event.target.files[0]);
      }
    };
  
    return (
      <div>
        <input type="file" onChange={handleChange} />
      </div>
    );
  }
  