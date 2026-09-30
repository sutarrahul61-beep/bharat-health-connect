import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Paperclip,
  CheckCheck,
  Building2,
  User,
  ShieldCheck,
  Clock,
  Phone,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { PortalMessageItem } from '../../types/portalTypes';

interface PatientMessagesProps {
  messages: PortalMessageItem[];
  patientId: string;
  patientName: string;
  assignedStaff: string;
  assignedHospital: string;
  onSendMessage: (msg: PortalMessageItem) => void;
}

export const PatientMessages: React.FC<PatientMessagesProps> = ({
  messages,
  patientId,
  patientName,
  assignedStaff,
  assignedHospital,
  onSendMessage,
}) => {
  const [newMessageText, setNewMessageText] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [activeTab, setActiveTab] = useState<'messages' | 'support'>('messages');

  // Support ticket state
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  const patientMessages = messages.filter((m) => m.patientId === patientId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg: PortalMessageItem = {
      id: `MSG-${Date.now()}`,
      patientId: patientId,
      senderType: 'patient',
      senderName: patientName,
      recipientType: 'coordinator',
      message: newMessageText.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      attachmentName: attachmentName ? attachmentName : undefined,
      read: true,
    };

    onSendMessage(newMsg);
    setNewMessageText('');
    setAttachmentName('');
  };

  const handleCreateSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportSubject.trim() || !supportMessage.trim()) return;

    const newMsg: PortalMessageItem = {
      id: `TKT-${Date.now()}`,
      patientId: patientId,
      senderType: 'patient',
      senderName: `${patientName} [SUPPORT TICKET: ${supportSubject.trim()}]`,
      recipientType: 'coordinator',
      message: supportMessage.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      read: false,
    };

    onSendMessage(newMsg);
    setSupportSubject('');
    setSupportMessage('');
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setActiveTab('messages');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Coordinator Communication & Support Desk
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
              Direct Case Liaison
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Directly communicate with your case manager ({assignedStaff}) and Miraj hospital coordinators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'messages'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Direct Messages
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'support'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Open Support Ticket
          </button>
        </div>
      </div>

      {activeTab === 'messages' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[560px]">
          {/* Channel Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/70 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                BHC
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {assignedStaff} (Bharat Health Connect)
                </h4>
                <div className="text-[11px] text-teal-700 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active on Case • Liaison with {assignedHospital}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Patient ID: <strong>{patientId}</strong></span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
            {patientMessages.map((msg) => {
              const isPatient = msg.senderType === 'patient';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] text-slate-400 mb-1 px-1">
                    <span>{msg.senderName}</span> • <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isPatient
                        ? 'bg-teal-600 text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.message}</p>

                    {msg.attachmentName && (
                      <div
                        className={`mt-2 p-2 rounded-xl text-[11px] flex items-center gap-2 ${
                          isPatient
                            ? 'bg-teal-700/60 text-teal-100 border border-teal-500/40'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Paperclip className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate font-medium">{msg.attachmentName}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5 px-1">
                    <CheckCheck className="w-3.5 h-3.5 text-teal-500" />
                    <span>Delivered</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white rounded-b-2xl">
            {attachmentName && (
              <div className="mb-2 p-2 bg-slate-100 rounded-lg text-xs text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1 truncate">
                  <Paperclip className="w-3.5 h-3.5 text-teal-600" /> Attached: {attachmentName}
                </span>
                <button
                  type="button"
                  onClick={() => setAttachmentName('')}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <label className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors">
                <Paperclip className="w-5 h-5" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAttachmentName(e.target.files[0].name);
                    }
                  }}
                />
              </label>

              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder="Type your medical query or question for the coordinator..."
                className="flex-1 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />

              <button
                type="submit"
                disabled={!newMessageText.trim()}
                className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Support Ticket Tab */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              Create Official Support Request
            </h3>
            <p className="text-xs text-slate-500">
              For emergency travel assistance, visa delays, dietary preferences, or accommodation changes.
            </p>
          </div>

          {supportSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
              Your support ticket has been submitted to your case coordinator.
            </div>
          )}

          <form onSubmit={handleCreateSupportTicket} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Subject / Issue Category *
              </label>
              <input
                type="text"
                required
                value={supportSubject}
                onChange={(e) => setSupportSubject(e.target.value)}
                placeholder="e.g. Visa Extension Assistance / Airport Pickup Timing"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Detailed Support Request *
              </label>
              <textarea
                required
                rows={4}
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Describe the assistance you require in detail..."
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-md cursor-pointer"
              >
                Submit Support Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
