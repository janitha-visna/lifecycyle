import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { FolderPlus } from 'lucide-react';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onCreate(folderName);
      setFolderName('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Folder" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Folder Name</label>
          <input
            type="text"
            required
            autoFocus
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="e.g. Technical Review"
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2"
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-accent text-white rounded-md text-sm font-medium hover:bg-accentHover"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            Create Folder
          </button>
        </div>
      </form>
    </Modal>
  );
};