"use client";
import React, { useState } from "react";
import { Gift, Sparkles, Upload, Download } from "lucide-react";
import { Employee, SecretSantaAssignment } from "@/types";
import { SecretSantaAssigner } from "@/utils/secretSantaLogic";
import FileUpload from "@/components/FileUpload";
import AssignmentResults from "@/components/AssignmentResults";
import SampleFile from "@/components/SampleFile";

function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [previousAssignments, setPreviousAssignments] = useState<
    SecretSantaAssignment[]
  >([]);
  const [currentAssignments, setCurrentAssignments] = useState<
    SecretSantaAssignment[]
  >([]);
  const [error, setError] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEmployeeUpload = (data: Employee[]) => {
    setEmployees(data);
    setError("");
  };

  const handlePreviousAssignmentsUpload = (data: SecretSantaAssignment[]) => {
    setPreviousAssignments(data);
    setError("");
  };

  const generateAssignments = async () => {
    try {
      setIsGenerating(true);
      if (employees.length < 2) {
        throw new Error(
          "Please upload employee data first (minimum 2 employees required)"
        );
      }

      const secretSantaAssigner = new SecretSantaAssigner();
      // Artificial delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const assignments = secretSantaAssigner.assignSecretSantas(
        employees,
        previousAssignments
      );
      setCurrentAssignments(assignments);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center animate-float">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gift className="w-12 h-12 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Secret Santa Assigner
            </h1>
            <Gift className="w-12 h-12 text-red-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Spread the joy of giving! Upload your employee list and previous
            assignments to generate new Secret Santa pairs for your team.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6 animate-slide-up">
          <div className="flex justify-end">
            <SampleFile />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Employee List
                </h2>
              </div>
              <FileUpload
                onFileUpload={handleEmployeeUpload}
                accept=".csv,.xlsx"
                label="Upload employees file"
              />
              {employees.length > 0 && (
                <div className="flex items-center gap-2 text-green-600">
                  <Sparkles className="w-4 h-4" />
                  <p className="text-sm font-medium">
                    {employees.length} employees loaded successfully
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Previous Assignments
                </h2>
              </div>
              <FileUpload
                onFileUpload={handlePreviousAssignmentsUpload}
                accept=".csv,.xlsx"
                label="Upload previous assignments file"
              />
              {previousAssignments.length > 0 && (
                <div className="flex items-center gap-2 text-green-600">
                  <Sparkles className="w-4 h-4" />
                  <p className="text-sm font-medium">
                    {previousAssignments.length} previous assignments loaded
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={generateAssignments}
              disabled={isGenerating}
              className={`
                px-8 py-4 rounded-xl text-white font-medium text-lg
                transition-all duration-200 transform hover:scale-105
                flex items-center gap-2
                ${
                  isGenerating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg hover:shadow-xl"
                }
              `}
            >
              <Gift className="w-5 h-5" />
              {isGenerating ? "Generating..." : "Generate Assignments"}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 animate-slide-up">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}
        </div>

        {currentAssignments.length > 0 && (
          <div className="bg-white p-8 rounded-2xl shadow-xl animate-slide-up">
            <AssignmentResults assignments={currentAssignments} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
