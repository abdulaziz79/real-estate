"use client";

import React, { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  itemTitle: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, amount, itemTitle }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="bg-slate-900 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Secure Checkout</p>
          <h2 className="text-2xl font-bold">Boost Listing</h2>
          <p className="text-slate-400 text-sm mt-1">{itemTitle}</p>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Standard Boost Fee</span>
            <span className="text-2xl font-bold text-slate-900">${amount}</span>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cardholder Name</label>
              <input required type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Card Number</label>
              <input required type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Expiry Date</label>
                <input required type="text" placeholder="MM / YY" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">CVC</label>
                <input required type="text" placeholder="•••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <button
              disabled={isProcessing}
              type="submit"
              className={`w-full mt-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-3 ${isProcessing ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </>
              ) : `Pay $${amount}`}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-4">By clicking "Pay", you agree to the Boost Terms. This transaction is secured by SSL encryption.</p>
          </form>
        </div>
      </div>
    </div>
  );
};
