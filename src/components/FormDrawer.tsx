'use client';

import React from 'react';
import { X, Sparkles, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { InvoiceData, InvoiceItem } from '@/types/invoice';

interface FormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
  onSave: () => void;
}

export default function FormDrawer({
  isOpen,
  onClose,
  invoice,
  setInvoice,
  onSave,
}: FormDrawerProps) {
  if (!isOpen) return null;

  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: 'Manali Expedition Tour Package',
      qty: 1,
      price: 42857.14,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const handleRemoveItem = (id: string) => {
    if (invoice.items.length <= 1) return;
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print font-sans">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-yellow-200">
          <div className="p-5 bg-[#FACC15] text-black flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-black" />
              <h2 className="text-base font-extrabold tracking-tight">
                Quick Form Drawer
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-black/10 hover:bg-black/20 text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs font-medium text-gray-700">
            {/* Customer Details */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-yellow-800">
                1. Customer Info
              </h3>
              <div className="space-y-2.5">
                <div>
                  <label className="block text-gray-500 font-semibold mb-1">
                    Traveler Name
                  </label>
                  <input
                    type="text"
                    value={invoice.customer.name}
                    onChange={(e) =>
                      setInvoice((prev) => ({
                        ...prev,
                        customer: { ...prev.customer, name: e.target.value },
                      }))
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 font-semibold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={invoice.customer.phone}
                    onChange={(e) =>
                      setInvoice((prev) => ({
                        ...prev,
                        customer: { ...prev.customer, phone: e.target.value },
                      }))
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-mono text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-yellow-800">
                  2. Tour Package Items
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-yellow-700 flex items-center gap-1 font-bold"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Row
                </button>
              </div>

              {invoice.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-2xl space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-gray-400">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          'description',
                          e.target.value
                        )
                      }
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-2 py-1 font-bold text-gray-900 focus:outline-none focus:border-[#FACC15]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => {
                onSave();
                onClose();
              }}
              className="w-full py-3 bg-[#FACC15] hover:bg-yellow-400 text-black font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
