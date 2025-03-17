import React, { useRef, useState } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';
import Papa from 'papaparse';
import { read, utils } from 'xlsx';
import { FileUploadProps } from '../types';

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, accept, label }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    processFile(file);
  };

  const processFile = async (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        complete: (results) => {
          onFileUpload(results.data);
        },
        header: true,
        skipEmptyLines: true
      });
    } else if (fileExtension === 'xlsx') {
      try {
        const data = await file.arrayBuffer();
        const workbook = read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);
        onFileUpload(jsonData);
      } catch (error) {
        console.error('Error reading XLSX file:', error);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
    }
  };

  return (
    <div className="w-full">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center w-full h-40
          border-2 border-dashed rounded-xl cursor-pointer
          transition-all duration-200
          ${isDragging
            ? 'border-red-500 bg-red-50'
            : fileName
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }
        `}
      >
        <div className="flex flex-col items-center justify-center p-6 text-center">
          {fileName ? (
            <>
              <CheckCircle className="w-8 h-8 mb-2 text-green-500" />
              <p className="text-sm text-green-600 font-medium">{fileName}</p>
              <p className="text-xs text-green-500 mt-1">File uploaded successfully</p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-red-100">
                <File className="w-6 h-6 text-red-600" />
              </div>
              <p className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">{label}</span>
              </p>
              <p className="text-xs text-gray-500">
                Drag & drop or click to upload CSV/XLSX files
              </p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;