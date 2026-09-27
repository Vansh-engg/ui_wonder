'use client';

import React from 'react';
import {
  User,
  Plus,
  Trash2,
  CheckCircle2,
  Receipt,
  CreditCard,
  MapPin,
  Building,
  Phone,
} from 'lucide-react';
import { InvoiceData, InvoiceItem } from '@/types/invoice';

interface InvoiceFormPanelProps {
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
  onSave: () => void;
}

export default function InvoiceFormPanel({
  invoice,
  setInvoice,
  onSave,
}: InvoiceFormPanelProps) {
  // Handlers for dynamic items
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
      description: 'Solang Snow Activity Pass',
      qty: 1,
      price: 1500,
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

  // Calculations
  const rawSubtotal = invoice.items.reduce(
    (acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0),
    0
  );
  const discount = Number(invoice.discount) || 0;
  const netPackageValue = Math.max(0, rawSubtotal - discount);

  // 5% GST split (Taxable Base = Net / 1.05)
  const taxableBase = netPackageValue / 1.05;
  const cgstAmount = taxableBase * 0.025;
  const sgstAmount = taxableBase * 0.025;

  const amountPaid = Number(invoice.amountPaid) || 0;
  const remainingBalance = netPackageValue - amountPaid;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="w-full bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-yellow-200/70 space-y-6 text-gray-900"
    >
      {/* 1. Traveler / Customer Details Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-900 flex items-center gap-1.5">
            <User className="w-4 h-4 text-yellow-600" /> 1. Traveler / Customer Details
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Customer Full Name *
            </label>
            <input
              type="text"
              required
              value={invoice.customer.name}
              onChange={(e) =>
                setInvoice((prev) => ({
                  ...prev,
                  customer: { ...prev.customer, name: e.target.value },
                }))
              }
              placeholder="e.g. Vikram Dhanaji Jadhav"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Phone Number (WhatsApp) (10 Digits) *
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="tel"
                required
                maxLength={10}
                value={invoice.customer.phone}
                onChange={(e) =>
                  setInvoice((prev) => ({
                    ...prev,
                    customer: { ...prev.customer, phone: e.target.value },
                  }))
                }
                placeholder="9876543210"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs font-mono font-bold text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              College / Organization
            </label>
            <div className="relative">
              <Building className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={invoice.customer.organization}
                onChange={(e) =>
                  setInvoice((prev) => ({
                    ...prev,
                    customer: {
                      ...prev.customer,
                      organization: e.target.value,
                    },
                  }))
                }
                placeholder="e.g. VESIT Chembur"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              City / Location
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={invoice.customer.city}
                onChange={(e) =>
                  setInvoice((prev) => ({
                    ...prev,
                    customer: { ...prev.customer, city: e.target.value },
                  }))
                }
                placeholder="e.g. Nerul, Navi Mumbai"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tour Description & Pricing Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-900 flex items-center gap-1.5">
            <Receipt className="w-4 h-4 text-yellow-600" /> 2. Tour Description & Pricing
          </span>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-2.5 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-950 font-extrabold text-xs rounded-xl flex items-center gap-1 border border-yellow-300 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add Item
          </button>
        </div>

        {/* Tour / Trip Name */}
        <div>
          <label className="block text-[11px] font-bold text-gray-600 mb-1">
            Tour / Trip Name *
          </label>
          <input
            type="text"
            required
            value={invoice.tourName}
            onChange={(e) =>
              setInvoice((prev) => ({ ...prev, tourName: e.target.value }))
            }
            placeholder="Enter tour or trip name (e.g. Manali Snow Expedition)"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        {/* Dynamic Items Rows */}
        <div className="space-y-2.5">
          {invoice.items.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(item.id, 'description', e.target.value)
                  }
                  placeholder={`Item ${idx + 1} description`}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#FACC15]"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-500 font-bold">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        'qty',
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-14 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-center font-mono font-bold focus:outline-none focus:border-[#FACC15]"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-500 font-bold">Price (₹):</span>
                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        'price',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-24 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-right font-mono font-bold focus:outline-none focus:border-[#FACC15]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={invoice.items.length <= 1}
                  className="p-1 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Discount & Net Value */}
        <div className="p-3 bg-yellow-50/60 border border-yellow-200 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700">Discount (₹):</span>
            <input
              type="number"
              min="0"
              value={invoice.discount}
              onChange={(e) =>
                setInvoice((prev) => ({
                  ...prev,
                  discount: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-24 bg-white border border-yellow-300 rounded-lg px-2 py-1 text-xs text-right text-emerald-600 font-mono font-bold focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t border-yellow-200/60 sm:border-0">
            <span className="text-gray-600 font-bold">Net Package Value:</span>
            <span className="text-sm font-mono font-black text-gray-900">
              ₹{netPackageValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Auto Calculated Tax Breakdown Card */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-gray-600 font-bold">
            <span>Commercial Tax Split (Tour Operator SAC 998555)</span>
            <span className="text-emerald-600">5% GST (2.5% CGST + 2.5% SGST)</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1.5 border-t border-gray-200 text-center font-mono">
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Taxable Base</span>
              <span className="text-xs font-bold text-gray-900">
                ₹{taxableBase.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">CGST (2.5%)</span>
              <span className="text-xs font-bold text-yellow-800">
                ₹{cgstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">SGST (2.5%)</span>
              <span className="text-xs font-bold text-yellow-800">
                ₹{sgstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Payment Details & Receipt Section */}
      <div className="space-y-3">
        <div className="pb-2 border-b border-gray-100">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-900 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-yellow-600" /> 3. Payment Details & Receipt
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Payment Stage / Type *
            </label>
            <input
              type="text"
              required
              value={invoice.paymentStage}
              onChange={(e) =>
                setInvoice((prev) => ({
                  ...prev,
                  paymentStage: e.target.value,
                }))
              }
              placeholder="e.g. Booking Deposit, 1st Installment, Full Payment"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Amount Received (₹) *
            </label>
            <input
              type="number"
              min="0"
              required
              value={invoice.amountPaid}
              onChange={(e) =>
                setInvoice((prev) => ({
                  ...prev,
                  amountPaid: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono font-extrabold text-emerald-600 focus:border-[#FACC15] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Payment Method
            </label>
            <select
              value={invoice.paymentMethod}
              onChange={(e) =>
                setInvoice((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none"
            >
              <option value="Google Pay / PhonePe / Paytm UPI">
                Google Pay / PhonePe / Paytm UPI
              </option>
              <option value="Bank Transfer (NEFT / IMPS / RTGS)">
                Bank Transfer (NEFT / IMPS / RTGS)
              </option>
              <option value="Cash in Hand">Cash in Hand</option>
              <option value="Credit / Debit Card">Credit / Debit Card</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              UTR / Reference ID (optional)
            </label>
            <input
              type="text"
              value={invoice.utrNumber}
              onChange={(e) =>
                setInvoice((prev) => ({ ...prev, utrNumber: e.target.value }))
              }
              placeholder="e.g. 426189201001"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Internal / Receipt Notes (optional)
            </label>
            <input
              type="text"
              value={invoice.notes}
              onChange={(e) =>
                setInvoice((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="e.g. Booking advance received, seat confirmed"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:border-[#FACC15] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Realtime Summary Card */}
        <div className="mt-4 p-3.5 bg-gray-50 border border-gray-200 rounded-2xl grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="text-[10px] text-gray-400 font-extrabold uppercase block truncate">
              Package Value
            </span>
            <span className="text-xs font-mono font-black text-gray-900 mt-0.5 block truncate">
              ₹{netPackageValue.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="border-x border-gray-200 px-2">
            <span className="text-[10px] text-emerald-600 font-extrabold uppercase block truncate">
              Amount Paid
            </span>
            <span className="text-xs font-mono font-black text-emerald-600 mt-0.5 block truncate">
              ₹{amountPaid.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-amber-700 font-extrabold uppercase block truncate">
              Remaining Balance
            </span>
            <span className="text-xs font-mono font-black text-amber-700 mt-0.5 block truncate">
              ₹{Math.max(0, remainingBalance).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Submit Button */}
      <button
        type="submit"
        className="w-full py-3.5 bg-[#FACC15] hover:bg-yellow-400 text-gray-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 border border-yellow-400"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>Issue WanderWorld Official Invoice & Receipt</span>
      </button>
    </form>
  );
}
