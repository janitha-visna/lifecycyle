// This service mimics AWS S3 interaction

export interface StorageFile {
    id: string;
    name: string;
    size: number;
    url: string;
    uploadDate: string;
  }
  
  const MOCK_FILES: StorageFile[] = [
    { id: '1', name: 'audit_report_v1.pdf', size: 1024 * 1024 * 2.5, url: '#', uploadDate: '2023-10-01' },
    { id: '2', name: 'evidence_photo.jpg', size: 1024 * 500, url: '#', uploadDate: '2023-10-05' },
    { id: '3', name: 'compliance_checklist.xlsx', size: 1024 * 25, url: '#', uploadDate: '2023-10-06' },
  ];
  
  export const storageService = {
    listFiles: async (folderId: string): Promise<StorageFile[]> => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      // Return mock files, maybe randomize slightly based on folderId for "realism"
      if (parseInt(folderId.substr(0, 1), 36) % 2 === 0) {
          return MOCK_FILES.slice(0, 2);
      }
      return MOCK_FILES;
    },
  
    uploadFile: async (folderId: string, file: File): Promise<StorageFile> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: Math.random().toString(36),
        name: file.name,
        size: file.size,
        url: '#',
        uploadDate: new Date().toISOString()
      };
    }
  };