import React from 'react';
import {
  Receipt,
  Download,
  CreditCard,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  FileCheck,
} from 'lucide-react';
import { PatientPaymentItem } from '../../types/portalTypes';

interface PatientPaymentsProps {
  payments: PatientPaymentItem[];
  patientId: string;
  patientName: string;
}

export const PatientPayments: React.FC<PatientPaymentsProps> = ({
  payments,
  patientId,
  patientName,
}) => {
  const patientPayments = payments.filter((p) => p.patientId === patientId);

  const handleDownloadReceipt = (payment: PatientPaymentItem) => {
    const receiptContent = `==========================================================\nBHARAT HEALTH CONNECT - OFFICIAL MEDICAL RECEIPT\n==========================================================\nReceipt No: ${payment.receiptNumber || 'RCP-' + payment.invoiceNumber}\nInvoice No: ${payment.invoiceNumber}\nDate: ${payment.paymentDate || new Date().toISOString().slice(0, 10)}\nPatient ID: ${patientId}\nPatient Name: ${patientName}\nHospital: ${payment.hospitalName}\nTreatment Description: ${payment.treatment}\nAmount Paid: ${payment.currency} ${payment.amount.toLocaleString()}\nStatus: ${payment.paymentStatus.toUpperCase()}\n\nAuthorized by Bharat Health Connect Financial Desk & Miraj Hospital Network.\n==========================================================`;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${payment.invoiceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Payments, Invoices & Official Receipts
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Direct Hospital Billing
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Transparent records for procedure deposits, hospital admission invoices, and verified receipts.
          </p>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>No hidden fees • Direct hospital receipts provided</span>
        </div>
      </div>

      {/* Payment Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {patientPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Invoice #</th>
                  <th className="py-3.5 px-4">Treatment / Purpose</th>
                  <th className="py-3.5 px-4">Hospital</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {patientPayments.map((pmt) => {
                  const isPaid = pmt.paymentStatus === 'Paid';
                  return (
                    <tr key={pmt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                        {pmt.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{pmt.treatment}</div>
                        {pmt.description && (
                          <div className="text-[11px] text-slate-400 line-clamp-1">{pmt.description}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-700">
                        {pmt.hospitalName}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap font-bold text-slate-900">
                        {pmt.currency} {pmt.amount.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isPaid
                              ? 'bg-emerald-100 text-emerald-800'
                              : pmt.paymentStatus === 'Partial'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isPaid ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                          {pmt.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                        {pmt.paymentDate || pmt.dueDate || 'Pending'}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {isPaid ? (
                          <button
                            onClick={() => handleDownloadReceipt(pmt)}
                            className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold text-xs rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Receipt
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Due at Admission</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            <Receipt className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <h4 className="text-sm font-semibold text-slate-700">No invoices yet</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Invoices and official payment receipts will be made available here as procedures and hospital packages are processed.
            </p>
          </div>
        )}
      </div>

      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-900 block mb-1">Financial Integrity & Authorized Information Policy:</strong>
          As per Bharat Health Connect patient facilitation guidelines, all payment figures represent official hospital estimates, laboratory charges, and authorized patient receipts. Internal administrative margins and third-party commercial arrangements are strictly prohibited from exposure.
        </div>
      </div>
    </div>
  );
};
