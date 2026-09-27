'use client';

import React from 'react';
import { InvoiceData } from '@/types/invoice';

interface InvoicePreviewCardProps {
  invoice: InvoiceData;
}

export default function InvoicePreviewCard({ invoice }: InvoicePreviewCardProps) {
  const formatAmount = (val: number) => {
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const rawSubtotal = invoice.items.reduce(
    (acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0),
    0
  );
  const discount = Number(invoice.discount) || 0;
  const netPackageValue = Math.max(0, rawSubtotal - discount);

  return (
    <div className="w-full flex justify-center py-0 no-select overflow-hidden max-h-[calc(100vh-80px)]">
      {/* Authentic A4 Document Sheet */}
      <div
        id="invoice-document-card"
        className="invoice-card bg-white w-full max-w-[660px] shadow-2xl border border-gray-200 relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 text-black font-sans leading-normal transform scale-[0.80] sm:scale-90 md:scale-95 lg:scale-[0.76] xl:scale-[0.82] 2xl:scale-95 origin-top transition-transform"
        style={{ fontFamily: "var(--font-sora), 'Sora', sans-serif" }}
      >
        {/* Background Mountain Translucent Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-6 opacity-15">
          <svg
            viewBox="0 0 500 300"
            className="w-[480px] h-[300px] text-[#FBD813]"
            fill="currentColor"
          >
            <path d="M 50,250 L 150,150 L 220,200 L 350,80 L 480,250 Z" />
          </svg>
        </div>

        {/* Top Header Section */}
        <div className="space-y-6 relative z-10">
          {/* Top Row: Brand Logo Badge */}
          <div className="flex justify-between items-start">
            {/* Dark Top Left Badge with Wanderworld Logo */}
            <div className="bg-[#191E28] text-white px-5 py-3.5 rounded-br-3xl flex items-center justify-center shadow-md">
              <img
                src="/logo.png"
                alt="Wanderworld Logo"
                className="h-12 w-auto object-contain filter drop-shadow-sm"
              />
            </div>
          </div>

          {/* Yellow Horizontal Line & INVOICE Heading */}
          <div className="relative pt-2">
            <div className="h-2.5 bg-[#FBD813] w-full rounded-full"></div>
            <div className="flex justify-between items-baseline pt-3">
              <div>
                <h1 className="text-3xl font-black text-black tracking-tight leading-none uppercase">
                  INVOICE
                </h1>
                <p className="text-xs font-mono font-bold text-gray-800 mt-1">
                  NO: {invoice.invoiceNumber}
                </p>
              </div>
            </div>
          </div>

          {/* GSTIN & Company Address */}
          <div className="text-xs text-gray-900 space-y-0.5 font-medium max-w-lg leading-relaxed">
            <p className="font-extrabold text-black">
              GSTIN: <span className="font-mono">{invoice.company.gstin}</span>
            </p>
            <p className="text-gray-800 leading-snug">{invoice.company.address}</p>
          </div>

          {/* Date & Invoice To Section */}
          <div className="pt-2 space-y-1">
            <p className="text-xs font-bold text-gray-700 font-mono">
              {invoice.dateIssued}
            </p>
            <h2 className="text-xl font-black text-black tracking-tight uppercase">
              INVOICE TO:
            </h2>
            <p className="text-lg font-bold italic text-black font-serif">
              {invoice.customer.name || 'Traveler Name'}
            </p>
            {invoice.customer.organization && (
              <p className="text-xs text-gray-600 font-medium">
                {invoice.customer.organization} {invoice.customer.city ? `(${invoice.customer.city})` : ''}
              </p>
            )}
          </div>

          {/* Line Items Table */}
          <div className="pt-4">
            <table className="w-full text-left text-xs border-collapse border border-black">
              <thead>
                <tr className="bg-[#FBD813] text-black font-extrabold border-b border-black">
                  <th className="py-2.5 px-3 border-r border-black w-12 text-center">
                    No
                  </th>
                  <th className="py-2.5 px-3 border-r border-black">
                    Description
                  </th>
                  <th className="py-2.5 px-3 border-r border-black w-14 text-center">
                    Qty
                  </th>
                  <th className="py-2.5 px-3 border-r border-black text-right">
                    Amount
                  </th>
                  <th className="py-2.5 px-3 border-r border-black text-right">
                    CGST(2.5%)
                  </th>
                  <th className="py-2.5 px-3 text-right">SGST(2.5%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black font-semibold text-black bg-white">
                {invoice.items.map((item, idx) => {
                  const qty = Number(item.qty) || 1;
                  const itemPrice = Number(item.price) || 0;
                  const totalLineVal = itemPrice * qty;
                  const baseAmt = totalLineVal / 1.05;
                  const cgst = baseAmt * 0.025;
                  const sgst = baseAmt * 0.025;

                  return (
                    <tr key={item.id} className="border-b border-black">
                      <td className="py-3 px-3 border-r border-black text-center font-mono font-bold">
                        {`0${idx + 1}.`}
                      </td>
                      <td className="py-3 px-3 border-r border-black font-bold text-black">
                        {item.description || invoice.tourName}
                      </td>
                      <td className="py-3 px-3 border-r border-black text-center font-mono">
                        {String(qty).padStart(2, '0')}
                      </td>
                      <td className="py-3 px-3 border-r border-black text-right font-mono">
                        {formatAmount(baseAmt)}/-
                      </td>
                      <td className="py-3 px-3 border-r border-black text-right font-mono">
                        {formatAmount(cgst)}/-
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        {formatAmount(sgst)}/-
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Final Amount Highlighted Box */}
            <div className="mt-6 flex justify-end">
              <div className="w-full sm:w-80 bg-[#FBD813] border border-black flex items-center justify-between px-4 py-2.5 shadow-sm">
                <span className="text-sm font-bold text-black">
                  Final Amount
                </span>
                <span className="text-base font-black text-black font-mono">
                  {Math.round(netPackageValue).toLocaleString('en-IN')}/-
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="pt-8 space-y-4 relative z-10">
          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-bold text-black border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-black shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{invoice.company.phones}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-black shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{invoice.company.email}</span>
            </div>
          </div>

          {/* Dark Bottom Badge */}
          <div className="bg-[#191E28] h-8 rounded-tr-3xl w-72"></div>
        </div>
      </div>
    </div>
  );
}
