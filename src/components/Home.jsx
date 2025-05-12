import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import ValidateDocument from "./ValidateDocument";
import ClipLoader from "react-spinners/ClipLoader";

const DOCUMENT_PARAMETERS = {
  UAT: [
    { key: "1", name: "Cover" },
    { key: "2", name: "Approval" },
    { key: "3", name: "Table of Content" },
    { key: "4", name: "Introduction" },
    { key: "5", name: "Scope Evaluation" },
    { key: "6", name: "Plan Testing" },
    { key: "7", name: "Rollback Test" },
    { key: "8", name: "Budget Detail" },
    { key: "9", name: "Result of Test" },
    { key: "10", name: "User Feedback and Suggestion" },
    { key: "11", name: "Summary of Testing" },
    { key: "12", name: "Lesson Learned" },
  ],

  BRD: [
    { key: "1", name: "Cover" },
    { key: "2", name: "Approval" },
    { key: "3", name: "Table of Content" },
    { key: "4", name: "Introduction" },
    { key: "5", name: "Background" },
    { key: "6", name: "Functional Requirement" },
    { key: "7", name: "Non Functional Requirement" },
    { key: "8", name: "Service Characteristics" },
    { key: "9", name: "Risk Assesment" },
    { key: "10", name: "Roles and Responsibilities Matrix" },
  ],

  PVT: [
    { key: "1", name: "Cover" },
    { key: "2", name: "Approval" },
    { key: "3", name: "Table of Content" },
    { key: "4", name: "Introduction" },
    { key: "5", name: "Scope" },
    { key: "6", name: "Plan PVT" },
    { key: "7", name: "PVT Scenario" },
    { key: "8", name: "Performance Test" },
    { key: "9", name: "Rollback Plan" },
    { key: "10", name: "PVT Result" },
    { key: "11", name: "Summary" },
  ],
};

function Home() {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset file and validation results when documentType changes
  useEffect(() => {
    setFile(null);
    setValidationResults(null);
  }, [documentType]);

  // Reset validation results when file changes
  useEffect(() => {
    setValidationResults(null);
  }, [file]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const performValidation = async () => {
    if (!file) {
      alert("Please upload a document first");
      return;
    }

    const requestId = crypto.randomUUID();
    const formData = new FormData();

    formData.append("requestId", requestId);
    formData.append("docType", documentType);
    formData.append("docFile", file);

    setIsLoading(true);

    // API integration here when it's available
    try {
      const response = await axios.post(
        "/api/api/v1/doc-verification",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data != null) {
        const { docType, parameters } = response.data;

        const results = DOCUMENT_PARAMETERS[docType].map((param) => ({
          ...param,
          exists: parameters[param.key] === true,
          pages: null, // atau bisa ditambahkan logika jika API nanti kirim data halaman
        }));
        setValidationResults(results);
      } else {
        setValidationResults([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Error during document verification." + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="mt-10">
        <ValidateDocument
          documentType={documentType}
          setDocumentType={setDocumentType}
          file={file}
          handleFileUpload={handleFileUpload}
          performValidation={performValidation}
          validationResults={validationResults}
          setValidationResults={setValidationResults}
          DOCUMENT_PARAMETERS={DOCUMENT_PARAMETERS}
          isLoading={isLoading}
        />
      </div>

      <Footer />

      {/* Popup Loading View */}
      {isLoading && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center justify-center space-y-4 animate-fadeIn">
            <ClipLoader color="#3498db" loading={isLoading} size={60} />
            <p className="text-center text-lg text-gray-500 font-medium">
              Please wait...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
