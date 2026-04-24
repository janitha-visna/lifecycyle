import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Bell, Calendar } from 'lucide-react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  onSave?: (date: string, message: string) => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose, folderName, onSave }) => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [linkToUpload, setLinkToUpload] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
        onSave(date, message);
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setDate('');
      setMessage('');
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Set Reminder: ${folderName}`} maxWidth="max-w-lg">
      {!isSaved ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full pl-10 rounded-md border-slate-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reminder Message</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Please upload the audit report before Friday..."
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2"
            />
          </div>

          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-md border border-blue-100">
             <input
                type="checkbox"
                id="linkUpload"
                checked={linkToUpload}
                onChange={(e) => setLinkToUpload(e.target.checked)}
                className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
             />
             <label htmlFor="linkUpload" className="text-sm text-slate-700 cursor-pointer">
                Trigger only if file status is <strong>Pending</strong>
             </label>
          </div>

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accentHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:col-start-2"
            >
              Set Reminder
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:col-start-1 sm:mt-0"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-green-100 p-3 mb-4">
                <Bell className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Reminder Set!</h3>
            <p className="text-sm text-slate-500 mt-2">The system will notify you on {date}.</p>
        </div>
      )}
    </Modal>
  );
};