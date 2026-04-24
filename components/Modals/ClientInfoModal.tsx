import React from 'react';
import { Modal } from '../common/Modal';
import { ClientInfo } from '../../types';
import { Mail, Phone, MapPin, Building2, User } from 'lucide-react';

interface ClientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ClientInfo;
}

export const ClientInfoModal: React.FC<ClientInfoModalProps> = ({ isOpen, onClose, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Client Information">
      <div className="space-y-6">
        <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Building2 className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-500">Company Name</h4>
            <p className="text-lg font-semibold text-slate-900">{data.companyName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Contact Person</p>
              <p className="text-sm font-medium text-slate-900">{data.contactName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Email Address</p>
              <a href={`mailto:${data.email}`} className="text-sm font-medium text-accent hover:underline">{data.email}</a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Phone Number</p>
              <p className="text-sm font-medium text-slate-900">{data.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Address</p>
              <p className="text-sm font-medium text-slate-900">{data.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
            onClick={onClose}
        >
            Close
        </button>
      </div>
    </Modal>
  );
};