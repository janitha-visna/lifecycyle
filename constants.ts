import { Cycle, Folder, PaymentRecord, ClientInfo, AuditDate, StageType, Reminder, UserAssignment } from './types';
import { v4 as uuidv4 } from 'uuid'; // Just kidding, we'll use simple random IDs for this demo

const generateId = () => Math.random().toString(36).substr(2, 9);

// --- Folder Templates ---

const applicationFolders = [
  "Adequacy Audit Report",
  "Application Review",
  "Audit Time Calculation"
];

const stage1Folders = [
  "Audit Plan",
  "Attendance",
  "Confidentiality Agreement",
  "Audit Report",
  "Audit Log",
  "Email Communication",
  "Corrective Action Plan"
];

const stage2Folders = [
  "Audit Plan",
  "Attendance",
  "Confidentiality Agreement",
  "Audit Report",
  "Audit Log",
  "Email Communication"
];

const certCommitteeFolders = [
  "Certification Committee",
  "Decision Certification",
  "Certificate",
  "Certification Agreement",
  "Notification Granting",
  "Terms & Conditions"
];

const surveillanceFolders = [
  "Notification Surveillance",
  "Attendance",
  "Confidentiality Agreement",
  "Audit Report",
  "Email Communication",
  "NC (Non-Conformance)"
];

const createFolders = (names: string[]): Folder[] => {
  return names.map(name => ({
    id: generateId(),
    name,
    fileCount: Math.floor(Math.random() * 5),
    status: Math.random() > 0.5 ? 'completed' : 'pending',
    lastModified: new Date().toISOString().split('T')[0]
  }));
};

// --- Cycle Construction ---

const buildCycle = (name: string, stages: { name: StageType, folders: string[] }[]): Cycle => {
  return {
    id: generateId(),
    name: name as any,
    stages: stages.map(s => ({
      id: generateId(),
      name: s.name,
      folders: createFolders(s.folders)
    }))
  };
};

export const CYCLES: Cycle[] = [
  buildCycle('Cycle 1', [
    { name: 'Application', folders: applicationFolders },
    { name: 'Stage 1', folders: stage1Folders },
    { name: 'Stage 2', folders: stage2Folders },
    { name: 'Certification Committee', folders: certCommitteeFolders },
    { name: 'Surveillance 1', folders: surveillanceFolders },
    { name: 'Surveillance 2', folders: surveillanceFolders },
  ]),
  buildCycle('Cycle 2', [
    { name: 'Surveillance 1', folders: surveillanceFolders },
    { name: 'Surveillance 2', folders: surveillanceFolders },
  ]),
  buildCycle('Cycle 3', [
    { name: 'Surveillance 1', folders: surveillanceFolders },
    { name: 'Surveillance 2', folders: surveillanceFolders },
  ])
];

// --- Mock Data ---

export const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    id: 'p1',
    date: '2023-01-15',
    amount: 5000,
    currency: 'USD',
    type: 'Advance',
    coverage: 'Stage 1 + Stage 2',
    status: 'Paid'
  },
  {
    id: 'p2',
    date: '2023-06-20',
    amount: 3500,
    currency: 'USD',
    type: 'Full',
    coverage: 'Surveillance 1 + Surveillance 2',
    status: 'Pending'
  }
];

export const MOCK_CLIENT: ClientInfo = {
  companyName: "Acme Certifications Ltd.",
  contactName: "John Doe",
  email: "j.doe@acme-certs.com",
  phone: "+1 (555) 012-3456",
  address: "123 Compliance Way, Audit City, ST 90210"
};

export const MOCK_AUDIT_DATES: AuditDate[] = [
  { cycleName: 'Cycle 1', stage: 'Stage 1', plannedDate: '2023-02-10', actualDate: '2023-02-12', status: 'Completed' },
  { cycleName: 'Cycle 1', stage: 'Stage 2', plannedDate: '2023-03-15', actualDate: '2023-03-15', status: 'Completed' },
  { cycleName: 'Cycle 1', stage: 'Surveillance 1', plannedDate: '2024-02-10', status: 'Scheduled' },
  { cycleName: 'Cycle 1', stage: 'Surveillance 2', plannedDate: '2025-02-10', status: 'Scheduled' },
  { cycleName: 'Cycle 2', stage: 'Surveillance 1', plannedDate: '2026-02-10', status: 'Scheduled' },
  { cycleName: 'Cycle 2', stage: 'Surveillance 2', plannedDate: '2027-02-10', status: 'Scheduled' },
];

export const MOCK_REMINDERS: Reminder[] = [
  {
    id: 'r1',
    folderName: 'Audit Report',
    date: '2023-10-01', // Past date
    message: 'Submit final audit report for Stage 1',
    status: 'Overdue'
  },
  {
    id: 'r2',
    folderName: 'NC (Non-Conformance)',
    date: '2023-11-15',
    message: 'Close out major non-conformance items',
    status: 'Pending'
  },
  {
    id: 'r3',
    folderName: 'Confidentiality Agreement',
    date: '2023-09-15',
    message: 'Sign and upload NDA',
    status: 'Completed'
  },
   {
    id: 'r4',
    folderName: 'Surveillance 1 Attendance',
    date: '2023-10-05',
    message: 'Upload signed attendance sheet',
    status: 'Overdue'
  }
];

export const MOCK_ASSIGNMENTS: UserAssignment[] = [
  {
    id: 'a1',
    assignedUsers: [
      { name: 'Sarah Jenkins', role: 'Lead Auditor' },
      { name: 'Mike Ross', role: 'Technical Reviewer' }
    ],
    startDate: '2023-09-15',
    status: 'Active'
  },
  {
    id: 'a2',
    assignedUsers: [
      { name: 'David Miller', role: 'Lead Auditor' }
    ],
    startDate: '2023-01-10',
    endDate: '2023-09-14',
    status: 'Previous'
  },
  {
    id: 'a3',
    assignedUsers: [
      { name: 'Jessica Pearson', role: 'Audit Manager' }
    ],
    startDate: '2022-11-01',
    endDate: '2023-01-09',
    status: 'Previous'
  }
];