import React, { useState } from 'react';
import { Folder, Reminder } from '../types';
import { Folder as FolderIcon, Bell, FileText, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { ReminderModal } from './Modals/ReminderModal';

interface FolderGridProps {
  folders: Folder[];
  onFolderClick: (folder: Folder) => void;
  reminders: Reminder[];
  onAddReminder: (folderName: string, date: string, message: string) => void;
  onDeleteFolder: (folderId: string) => void;
}

export const FolderGrid: React.FC<FolderGridProps> = ({ folders, onFolderClick, reminders, onAddReminder, onDeleteFolder }) => {
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [activeFolderForReminder, setActiveFolderForReminder] = useState<string>('');

  const handleReminderClick = (e: React.MouseEvent, folderName: string) => {
    e.stopPropagation();
    setActiveFolderForReminder(folderName);
    setReminderModalOpen(true);
  };

  const handleSaveReminder = (date: string, message: string) => {
      onAddReminder(activeFolderForReminder, date, message);
  };

  const getReminderForFolder = (folderName: string) => {
      return reminders.find(r => r.folderName === folderName && r.status !== 'Completed');
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {folders.map((folder) => {
          const activeReminder = getReminderForFolder(folder.name);
          
          return (
            <div 
              key={folder.id} 
              onClick={() => onFolderClick(folder)}
              className="group relative bg-white rounded-xl shadow-sm border border-slate-200 hover:border-accent hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              {/* Folder Header / Card Main */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${folder.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-accent'}`}>
                    {folder.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <FolderIcon className="w-6 h-6" />}
                  </div>
                  
                  <div className="flex space-x-1">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteFolder(folder.id); }}
                        className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10"
                        title="Delete Folder"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={(e) => handleReminderClick(e, folder.name)}
                        className={`p-2 rounded-full transition-colors tooltip-trigger z-10 ${
                            activeReminder 
                            ? 'text-accent bg-blue-50 ring-1 ring-blue-100' 
                            : 'text-slate-400 hover:text-accent hover:bg-slate-50'
                        }`}
                        title="Set Reminder"
                    >
                        <Bell className={`w-5 h-5 ${activeReminder ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-accent transition-colors">{folder.name}</h3>
                <div className="flex items-center text-sm text-slate-500 space-x-4 mb-3">
                  <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" /> {folder.fileCount} files
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${folder.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {folder.status === 'completed' ? 'Complete' : 'Pending'}
                  </span>
                </div>

                {/* Reminder Date Badge */}
                {activeReminder && (
                    <div className="flex items-center text-xs text-amber-700 bg-amber-50 px-2 py-1.5 rounded-md border border-amber-100 mt-2">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        <span className="font-medium">Due: {activeReminder.date}</span>
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ReminderModal 
        isOpen={reminderModalOpen} 
        onClose={() => setReminderModalOpen(false)} 
        folderName={activeFolderForReminder}
        onSave={handleSaveReminder}
      />
    </>
  );
};