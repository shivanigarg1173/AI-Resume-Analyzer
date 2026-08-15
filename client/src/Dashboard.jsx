import { useState } from "react";
import axios from "axios";
import  "./Dashboard.css";
function Dashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select your resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setResult(response.data.analysis);

      alert("Resume analyzed successfully!");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Resume upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <button className="logout-btn"
       onClick={() => {
       localStorage.removeItem("token");
       window.location.reload();
    // window.location.href = "/login";
  }}
  >
  Logout
</button>
      <h1>AI Resume Analyzer</h1>


      <div className="upload-box">

      <p>Upload your resume and get an AI-powered ATS analysis.</p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button className="analyze-btn" onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
      </div>
    {result && (
      <div className="result">
        <div className="score-card">
             <h2>ATS Score</h2>
            <h1>{result.atsScore}/100</h1>

             <progress
             value={result.atsScore}
             max="100"
            ></progress>
            </div>
          <div className="result-card">
          <h3>Strengths</h3>
          <ul>
            {result.strengths?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </div>
          <div className="result-card">
          <h3>Weaknesses</h3>
          <ul>
            {result.weaknesses?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </div>
           <div className="result-card">
          <h3>Missing Skills</h3>
          <ul>
            {result.missingSkills?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </div>

          <div className="result-card">

          <h3>Suggestions</h3>
          <ul>
            {result.suggestions?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </div>
        </div>
  )}
    </div>
  );
}

export default Dashboard;
    