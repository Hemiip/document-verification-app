import React, { useState } from "react";
import { File, CheckCircle, XCircle } from "lucide-react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ValidateDocument from "./components/ValidateDocument";

const DOCUMENT_PARAMETERS = {
  UAT: [
    { key: "objective", name: "Objective" },
    { key: "scope", name: "Scope" },
    { key: "testCases", name: "Test Cases" },
    { key: "testResults", name: "Test Results" },
    { key: "signOff", name: "Sign-off Section" },
  ],
  BRD: [
    { key: "businessNeed", name: "Business Need" },
    { key: "stakeholders", name: "Stakeholders" },
    { key: "functionalRequirements", name: "Functional Requirements" },
    { key: "nonFunctionalRequirements", name: "Non-Functional Requirements" },
    { key: "constraintAssumptions", name: "Constraints & Assumptions" },
  ],
  SIT: [
    { key: "integrationPoints", name: "Integration Points" },
    { key: "testEnvironment", name: "Test Environment" },
    { key: "testScenarios", name: "Test Scenarios" },
    { key: "testData", name: "Test Data" },
    { key: "defectTracking", name: "Defect Tracking" },
  ],
};

function App() {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [validationResults, setValidationResults] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const performValidation = () => {
    if (!file) {
      alert("Please upload a document first");
      return;
    }

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

    setValidationResults(results);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <ValidateDocument
        documentType={documentType}
        setDocumentType={setDocumentType}
        file={file}
        handleFileUpload={handleFileUpload}
        performValidation={performValidation}
        validationResults={validationResults}
        DOCUMENT_PARAMETERS={DOCUMENT_PARAMETERS}
      />
      <Footer />
    </div>
  );
}

export default App;
