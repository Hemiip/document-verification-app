import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ValidateDocument from "./ValidateDocument";
import ClipLoader from "react-spinners/ClipLoader";

const DOCUMENT_PARAMETERS = {
  UAT: [
    { key: "1", name: "Cover" },
    { key: "2", name: "Table of Content" },
    { key: "3", name: "Introduction" },
    { key: "4", name: "Scope Evaluation" },
    { key: "5", name: "Plan Testing" },
    { key: "6", name: "Rollback Test" },
    { key: "7", name: "Budget Detail" },
    { key: "8", name: "Result of Test" },
    { key: "9", name: "User Feedback and Suggestion" },
    { key: "10", name: "Summary of Testing" },
    { key: "11", name: "Lesson Learned" },
  ],

  BRD: [
    { key: "1", name: "Cover" },
    { key: "2", name: "Table of Content" },
    { key: "3", name: "Introduction" },
    { key: "4", name: "Background" },
    { key: "5", name: "Functional Requirement" },
    { key: "6", name: "Non Functional Requirement" },
    { key: "7", name: "Service Characteristics" },
    { key: "8", name: "Risk Assesment" },
    { key: "9", name: "Roles and Responsibilities Matrix" },
  ],

  PVT: [
    { key: "1", name: "Cover" },
    { key: "2", name: "Table of Content" },
    { key: "3", name: "Introduction" },
    { key: "4", name: "Scope" },
    { key: "5", name: "Plan PVT" },
    { key: "6", name: "PVT Scenario" },
    { key: "7", name: "Performance Test" },
    { key: "8", name: "Rollback Plan" },
    { key: "9", name: "PVT Result" },
    { key: "10", name: "Summary" },
  ],
};

function Home() {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading animation

  // Reset file and validation results when documentType changes
  useEffect(() => {
    setFile(null); // Reset file when documentType changes
    setValidationResults(null); // Reset validation results when documentType changes
  }, [documentType]);

  // Reset validation results when file changes
  useEffect(() => {
    setValidationResults(null); // Reset validation results when file changes
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

    setIsLoading(true); // Start loading animation

    setTimeout(() => {
      const results = DOCUMENT_PARAMETERS[documentType].map((param) => ({
        ...param,
        exists: Math.random() > 0.3,
        pages:
          Math.random() > 0.5
            ? `${Math.floor(Math.random() * 10) + 1}-${
                Math.floor(Math.random() * 20) + 10
              }`
            : null,
      }));

      setValidationResults(results); // Update validation results after delay
      setIsLoading(false); // Stop loading animation
    }, 3000); // 3 seconds delay

    // You can use the actual API integration here when it's available
    // try {
    //   const response = await axios.post(
    //     "https://domainku.com/api/v1/doc-verification",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    // } catch (error) {
    //   console.error("Error during API request:", error);
    //   alert("Error during document verification.");
    // } finally {
    //   setIsLoading(false);
    // }
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
