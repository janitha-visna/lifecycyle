import React from 'react';
import { Modal } from '../common/Modal';
import { PaymentRecord } from '../../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payments: PaymentRecord[];
}

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'Paid') {
    return <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Paid</span>;
  }
  if (status === 'Pending') {
    return <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"><Clock className="w-3 h-3 mr-1" /> Pending</span>;
  }
  return <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"><AlertCircle className="w-3 h-3 mr-1" /> Overdue</span>;
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, payments }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment History" maxWidth="max-w-4xl">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Coverage</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{payment.date}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.coverage}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.type}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">{payment.currency} {payment.amount.toLocaleString()}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <StatusBadge status={payment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};