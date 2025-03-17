import { Employee, SecretSantaAssignment } from '../types';

export class SecretSantaAssigner {
  private shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private isValidAssignment(
    santa: Employee,
    child: Employee,
    previousAssignments: SecretSantaAssignment[]
  ): boolean {
    // Check if santa is not choosing themselves
    if (santa.Employee_EmailID === child.Employee_EmailID) {
      return false;
    }

    // Check if this assignment existed in previous year
    const previousAssignment = previousAssignments.find(
      (assignment) => assignment.Employee_EmailID === santa.Employee_EmailID
    );

    if (previousAssignment && previousAssignment.Secret_Child_EmailID === child.Employee_EmailID) {
      return false;
    }

    return true;
  }

  public assignSecretSantas(
    employees: Employee[],
    previousAssignments: SecretSantaAssignment[] = []
  ): SecretSantaAssignment[] {
    if (employees.length < 2) {
      throw new Error('Need at least 2 employees for Secret Santa');
    }

    const assignments: SecretSantaAssignment[] = [];
    const unassignedChildren = this.shuffle([...employees]);
    const santas = [...employees];

    for (const santa of santas) {
      let validChildFound = false;
      
      for (let i = 0; i < unassignedChildren.length; i++) {
        const potentialChild = unassignedChildren[i];
        
        if (this.isValidAssignment(santa, potentialChild, previousAssignments)) {
          assignments.push({
            ...santa,
            Secret_Child_Name: potentialChild.Employee_Name,
            Secret_Child_EmailID: potentialChild.Employee_EmailID
          });
          
          unassignedChildren.splice(i, 1);
          validChildFound = true;
          break;
        }
      }

      if (!validChildFound) {
        throw new Error('Could not find valid assignments for all employees');
      }
    }

    return assignments;
  }
}