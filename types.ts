export type CycleName = 'Cycle 1' | 'Cycle 2' | 'Cycle 3';

export type StageType = 
  | 'Application'
  | 'Stage 1'
  | 'Stage 2'
  | 'Certification Committee'
  | 'Surveillance 1'
  | 'Surveillance 2';

export interface Folder {
  id: string;
  name: string;
  fileCount: number;
  status: 'empty' | 'pending' | 'completed';
  lastModified?: string;
}

export interface Stage {
  id: string;
  name: StageType;
  folders: Folder[];
}

export interface Cycle {
  id: string;
  name: CycleName;
  stages: Stage[];
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  currency: string;
  type: 'Full' | 'Advance';
  coverage: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface ClientInfo {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
}

export interface AuditDate {
  cycleName: string; // Added for grouping
  stage: string;
  plannedDate: string;
  actualDate?: string;
  status: 'Scheduled' | 'Completed' | 'Delayed';
}

export type ReminderStatus = 'Pending' | 'Completed' | 'Overdue';

export interface Reminder {
  id: string;
  folderId?: string; // Optional if global
  folderName: string;
  date: string;
  message: string;
  status: ReminderStatus;
}

export interface UserAssignment {
  id: string;
  assignedUsers: { name: string; role: string }[];
  startDate: string;
  endDate?: string; // If undefined/null, it's the current assignment
  status: 'Active' | 'Previous';
}