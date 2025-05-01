import React, { useState, useEffect } from "react";
import { File, CheckCircle, XCircle } from "lucide-react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ValidateDocument from "./components/ValidateDocument";

const DOCUMENT_PARAMETERS = {
  UAT: [
    { key: "cover", name: "Cover" },
    { key: "tableOfContent", name: "Table of Content" },
    { key: "introduction", name: "Introduction" },
    { key: "scopeEvaluation", name: "Scope Evaluation" },
    { key: "planTesting", name: "Plan Testing" },
    { key: "rollbackTest", name: "Rollback Test" },
    { key: "budgetDetail", name: "Budget Detail" },
    { key: "resultOfTest", name: "Result of Test" },
    { key: "userFeedbackAndSuggestion", name: "User Feedback and Suggestion" },
    { key: "summaryOfTesting", name: "Summary of Testing" },
    { key: "lessonLearned", name: "Lesson Learned" },
  ],

  BRD: [
    { key: "cover", name: "Cover" },
    { key: "tableOfContent", name: "Table of Content" },
    { key: "introduction", name: "Introduction" },
    { key: "background", name: "Background" },
    { key: "functionalRequirement", name: "Functional Requirement" },
    { key: "nonFunctionalRequirement", name: "Non Functional Requirement" },
    { key: "serviceCharacteristics", name: "Service Characteristics" },
    { key: "riskAssesment", name: "Risk Assesment" },
    {
      key: "rolesAndResponsibilitiesMatrix",
      name: "Roles and Responsibilities Matrix",
    },
  ],

  PVT: [
    { key: "cover", name: "Cover" },
    { key: "tableOfContent", name: "Table of Content" },
    { key: "introduction", name: "Introduction" },
    { key: "scope", name: "Scope" },
    { key: "planPVT", name: "Plan PVT" },
    { key: "pvtScenario", name: "PVT Scenario" },
    { key: "performanceTest", name: "Performance Test" },
    { key: "rollbackPlan", name: "Rollback Plan" },
    { key: "pvtResult", name: "PVT Result" },
    { key: "summary", name: "Summary" },
  ],
};

function App() {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [validationResults, setValidationResults] = useState(null);

  // Reset validation results when file changes
  useEffect(() => {
    setValidationResults(null); // Reset validation results when file changes
  }, [file]); // This hook runs whenever `file` changes

  // Reset file and validation results when documentType changes
  useEffect(() => {
    setFile(null); // Reset file when documentType changes
    setValidationResults(null); // Reset validation results when documentType changes
  }, [documentType]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    console.log("file yang di upload", uploadedFile.name);
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
        setValidationResults={setValidationResults}
        DOCUMENT_PARAMETERS={DOCUMENT_PARAMETERS}
      />

      <Footer />
    </div>
  );
}

export default App;
