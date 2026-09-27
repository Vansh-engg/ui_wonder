'use client';

import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full no-print">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between p-3.5 rounded-2xl shadow-xl border text-xs font-bold transition-all transform animate-bounce-short ${
            toast.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-500'
              : toast.type === 'error'
              ? 'bg-rose-600 text-white border-rose-500'
              : 'bg-yellow-600 text-white border-yellow-500'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-200" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-200" />
            ) : (
              <Info className="w-4 h-4 shrink-0 text-yellow-200" />
            )}
            <span>{toast.text}</span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 rounded-lg hover:bg-black/10 transition-colors ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
