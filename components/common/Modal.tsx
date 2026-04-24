import React, { Fragment } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full ${maxWidth}`}>
          
          {/* Header */}
          <div className="bg-slate-50 px-4 py-3 sm:px-6 flex justify-between items-center border-b border-slate-200">
            <h3 className="text-lg font-semibold leading-6 text-slate-900" id="modal-title">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 py-5 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};