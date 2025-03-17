import { describe, it, expect } from 'vitest';
import { SecretSantaAssigner } from '../utils/secretSantaLogic';
import { Employee, SecretSantaAssignment } from '../types';

describe('SecretSantaAssigner', () => {
  const employees: Employee[] = [
    { Employee_Name: 'John Doe', Employee_EmailID: 'john@acme.com' },
    { Employee_Name: 'Jane Smith', Employee_EmailID: 'jane@acme.com' },
    { Employee_Name: 'Bob Johnson', Employee_EmailID: 'bob@acme.com' }
  ];

  const previousAssignments: SecretSantaAssignment[] = [
    {
      Employee_Name: 'John Doe',
      Employee_EmailID: 'john@acme.com',
      Secret_Child_Name: 'Jane Smith',
      Secret_Child_EmailID: 'jane@acme.com'
    }
  ];

  it('should throw error if less than 2 employees', () => {
    const assigner = new SecretSantaAssigner();
    const singleEmployee = [employees[0]];

    expect(() => assigner.assignSecretSantas(singleEmployee)).toThrow('Need at least 2 employees');
  });

  it('should assign secret santas to all employees', () => {
    const assigner = new SecretSantaAssigner();
    const assignments = assigner.assignSecretSantas(employees);

    expect(assignments.length).toBe(employees.length);
    
    // Check that each employee is assigned exactly once as a santa
    const santaEmails = assignments.map(a => a.Employee_EmailID);
    expect(new Set(santaEmails).size).toBe(employees.length);

    // Check that each employee is assigned exactly once as a child
    const childEmails = assignments.map(a => a.Secret_Child_EmailID);
    expect(new Set(childEmails).size).toBe(employees.length);
  });

  it('should not assign same santa-child pair as previous year', () => {
    const assigner = new SecretSantaAssigner();
    const assignments = assigner.assignSecretSantas(employees, previousAssignments);

    const johnAssignment = assignments.find(a => a.Employee_EmailID === 'john@acme.com');
    expect(johnAssignment?.Secret_Child_EmailID).not.toBe('jane@acme.com');
  });

  it('should not assign employee as their own secret child', () => {
    const assigner = new SecretSantaAssigner();
    const assignments = assigner.assignSecretSantas(employees);

    assignments.forEach(assignment => {
      expect(assignment.Employee_EmailID).not.toBe(assignment.Secret_Child_EmailID);
    });
  });
});