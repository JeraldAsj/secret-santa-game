export interface Employee {
  Employee_Name: string;
  Employee_EmailID: string;
}

export interface SecretSantaAssignment extends Employee {
  Secret_Child_Name: string;
  Secret_Child_EmailID: string;
}

export interface FileUploadProps {
  onFileUpload: (data: any[]) => void;
  accept: string;
  label: string;
}
