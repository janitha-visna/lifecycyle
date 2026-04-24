import React, { useEffect, useState } from 'react';
import { Folder } from '../types';
import { storageService, StorageFile } from '../services/storageService';
import { ArrowLeft, UploadCloud, File as FileIcon, MoreVertical, Download, Trash2, Calendar, FileText } from 'lucide-react';

interface FolderDetailsProps {
  folder: Folder;
  onBack: () => void;
}

export const FolderDetails: React.FC<FolderDetailsProps> = ({ folder, onBack }) => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      try {
        const data = await storageService.listFiles(folder.id);
        setFiles(data);
      } catch (error) {
        console.error("Failed to load files", error);
      } finally {
        setLoading(false);
      }
    };
    loadFiles();
  }, [folder.id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const newFile = await storageService.uploadFile(folder.id, e.target.files[0]);
        setFiles(prev => [newFile, ...prev]);
      } catch (error) {
        alert("Upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Stage
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{folder.name}</h2>
                <p className="text-slate-500 mt-1">Manage files and documents for this section.</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${folder.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {folder.status === 'completed' ? 'Status: Complete' : 'Status: Pending'}
            </div>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${uploading ? 'bg-slate-50 border-slate-300' : 'border-slate-300 hover:bg-slate-50 hover:border-accent'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploading ? (
                         <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mb-2"></div>
                            <p className="text-sm text-slate-500">Uploading to AWS Storage...</p>
                         </div>
                    ) : (
                        <>
                            <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                            <p className="text-sm text-slate-500"><span className="font-semibold text-accent">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-slate-400">PDF, XLSX, DOCX, JPG (MAX. 10MB)</p>
                        </>
                    )}
                </div>
                <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
        </div>

        {/* File List */}
        <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-slate-400" />
                Uploaded Documents
            </h3>
            
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : files.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-slate-500">No files uploaded yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg hover:shadow-md transition-shadow group">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-blue-50 text-accent rounded-lg">
                                    <FileIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{file.name}</p>
                                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB • {new Date(file.uploadDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-accent hover:bg-slate-50 rounded-full" title="Download">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full" title="Delete">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
