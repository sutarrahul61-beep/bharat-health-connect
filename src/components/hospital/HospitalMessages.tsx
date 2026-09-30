import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Building2,
  User,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';
import { PortalMessageItem } from '../../types/portalTypes';
import { PatientRecord } from '../admin/types';

interface HospitalMessagesProps {
  hospitalId: string;
  hospitalName: string;
  hospitalUserId: string;
  hospitalUserName: string;
  assignedPatients: PatientRecord[];
  messages: PortalMessageItem[];
  onSendMessage: (msg: PortalMessageItem) => void;
}

export const HospitalMessages: React.FC<HospitalMessagesProps> = ({
  hospitalId,
  hospitalName,
  hospitalUserId,
  hospitalUserName,
  assignedPatients,
  messages,
  onSendMessage,
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    assignedPatients[0] ? assignedPatients[0].id : ''
  );
  const selectedPatient = assignedPatients.find((p) => p.id === selectedPatientId) || assignedPatients[0];

  const [messageText, setMessageText] = useState('');

  // Filter messages for this selected patient or general coordinator communications
  const patientMessages = messages.filter(
    (m) => m.patientId === selectedPatientId
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedPatientId) return;

    const newMsg: PortalMessageItem = {
      id: `MSG-HOSP-${Date.now()}`,
      patientId: selectedPatientId,
      hospitalId: hospitalId,
      senderType: 'hospital',
      senderName: `${hospitalName} (${hospitalUserName})`,
      recipientType: 'coordinator',
      message: messageText.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      read: true,
    };

    onSendMessage(newMsg);
    setMessageText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Coordinator & Patient Case Communication
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
              Hospital Channel
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Exchange clinical notes, OT scheduling updates, and bed reservations with Bharat Health Connect coordinators.
          </p>
        </div>

        {/* Patient Case Selector */}
        {assignedPatients.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">Active Patient Thread:</span>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {assignedPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName} ({p.id})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Chat Thread */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[540px]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              HOSP
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                {selectedPatient ? selectedPatient.fullName : 'Patient Case'} - Case Facilitation Desk
              </h4>
              <div className="text-[11px] text-slate-500">
                {hospitalName} • Hospital User: {hospitalUserName}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Encrypted Case Audit</span>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
          {patientMessages.length > 0 ? (
            patientMessages.map((msg) => {
              const isHospital = msg.senderType === 'hospital';
              const isPatient = msg.senderType === 'patient';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isHospital ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] text-slate-400 mb-1 px-1">
                    <span>{msg.senderName}</span> • <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isHospital
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : isPatient
                        ? 'bg-teal-50 border border-teal-200 text-teal-900 rounded-bl-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.message}</p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5 px-1">
                    <CheckCheck className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Logged to Case {selectedPatientId}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              No previous messages in this patient thread. Send an update below to Bharat Health Connect coordinators.
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white rounded-b-2xl flex items-center gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={`Type clinical update regarding ${selectedPatient?.fullName || 'patient'}...`}
            className="flex-1 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!messageText.trim()}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
