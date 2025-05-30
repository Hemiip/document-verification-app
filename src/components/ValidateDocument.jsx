import React, { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { File as FileIcon } from "lucide-react";

const ValidateDocument = ({
  documentType,
  setDocumentType,
  file,
  handleFileUpload,
  performValidation,
  validationResults,
  setValidationResults,
  DOCUMENT_PARAMETERS,
  isLoading,
}) => {
  // Reset validation results when documentType changes
  useEffect(() => {
    setValidationResults(null);
  }, [documentType, setValidationResults]);

  return (
    <main className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg my-12">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Select Document Type
        </label>
        <div className="relative w-full">
          <select
            className="w-full px-3 py-2 border rounded-lg appearance-none pr-10"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Choose Document Type</option>
            <option value="UAT">User Acceptance Testing (UAT)</option>
            <option value="BRD">Business Requirement Document (BRD)</option>
            <option value="PVT">Production Verification Test (PVT)</option>
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            ▼
          </span>
        </div>
      </div>

      {documentType && (
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Parameter of contents:</h3>
          <ul className="list-disc pl-5">
            {DOCUMENT_PARAMETERS[documentType].map((param) => (
              <li key={param.key} className="text-sm text-gray-700">
                {param.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Upload Document
        </label>
        <div className="items-center justify-center w-full">
          <label
            className={`flex flex-col items-center px-6 py-4 rounded-lg shadow-lg tracking-wide border cursor-pointer ${
              !documentType
                ? "bg-gray-200 text-gray-400 border-gray-300" // Disabled state
                : "bg-white text-blue-400 border-blue-100 hover:bg-blue-100" // Active state
            }`}
          >
            <FileIcon
              className={`w-8 h-8 ${
                !documentType ? "text-gray-400" : "text-blue-400"
              }`}
            />
            <span
              className={`mt-2 text-base leading-normal ${
                !documentType ? "text-gray-400" : "text-blue-400"
              }`}
            >
              {file ? file.name : "Select a file"}
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={!documentType}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <button
          onClick={performValidation}
          disabled={!documentType || !file}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          {isLoading ? "Verification in progress..." : "Start Verification"}
        </button>

        <div className="w-10" />

        {file && (
          <button
            onClick={() => window.open(URL.createObjectURL(file))}
            className="border border-gray-500 text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Preview Document
          </button>
        )}
      </div>

      {validationResults === null ? (
        <div className="mt-4 text-center text-gray-500">
          No verification results yet
          <br />
          Please upload a document and click "Start Verification"
        </div>
      ) : validationResults.length === 0 ? (
        <div className="mt-4 text-center text-yellow-600">
          Failed
          <br />
          No parameters were returned from the server
        </div>
      ) : validationResults.every((r) => !r.exists) ? (
        <div className="mt-4 text-center text-yellow-600">
          Failed
          <br />
          Verification complete, but no document sections were found
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Verification Results</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Parameter</th>
                <th className="border p-2">Exists</th>
              </tr>
            </thead>
            <tbody>
              {validationResults.map((result) => (
                <tr key={result.key} className="text-center">
                  <td className="border p-2">{result.name}</td>
                  <td className="border p-2">
                    {result.exists ? (
                      <CheckCircle className="text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              validationResults.every((r) => r.exists)
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            Verification Complete:{" "}
            {validationResults.filter((r) => r.exists).length} of{" "}
            {validationResults.length} parameters found
          </div>
        </div>
      )}
    </main>
  );
};

export default ValidateDocument;
