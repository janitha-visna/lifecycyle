import React from 'react';
import { Modal } from '../common/Modal';
import { UserAssignment } from '../../types';
import { User, History, Users } from 'lucide-react';

interface UserHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignments: UserAssignment[];
}

export const UserHistoryModal: React.FC<UserHistoryModalProps> = ({ isOpen, onClose, assignments }) => {
  const activeAssignment = assignments.find(a => a.status === 'Active');
  const historyAssignments = assignments.filter(a => a.status === 'Previous');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Case Assignment History" maxWidth="max-w-lg">
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
        
        {/* Current Assignment */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" /> Currently Assigned
            </h4>
            
            {activeAssignment ? (
                <div className="space-y-3">
                    {activeAssignment.assignedUsers.map((user, idx) => (
                        <div key={idx} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.role}</p>
                             </div>
                        </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-blue-100 text-xs text-blue-600 font-medium">
                        Assigned since: {activeAssignment.startDate}
                    </div>
                </div>
            ) : (
                <p className="text-sm text-slate-500 italic">No active assignment.</p>
            )}
        </div>

        {/* History */}
        <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 flex items-center pl-1">
                <History className="w-4 h-4 mr-2" /> Assignment History
            </h4>
            
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pb-2">
                {historyAssignments.length === 0 ? (
                    <div className="ml-6 text-sm text-slate-400 italic">No previous assignments.</div>
                ) : (
                    historyAssignments.map((assignment) => (
                        <div key={assignment.id} className="relative ml-6">
                            <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-slate-300"></span>
                            
                            <div className="bg-white border border-slate-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                <div className="space-y-2 mb-2">
                                    {assignment.assignedUsers.map((user, idx) => (
                                        <div key={idx} className="flex items-center space-x-2">
                                            <User className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm font-medium text-slate-900">{user.name}</span>
                                            <span className="text-xs text-slate-400">• {user.role}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs text-slate-500 font-mono bg-slate-50 inline-block px-2 py-1 rounded">
                                    {assignment.startDate} — {assignment.endDate}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
         <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">Close</button>
      </div>
    </Modal>
  );
};