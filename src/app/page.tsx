'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import InvoiceFormPanel from '@/components/InvoiceFormPanel';
import InvoicePreviewCard from '@/components/InvoicePreviewCard';
import Toast, { ToastMessage } from '@/components/Toast';
import { INITIAL_INVOICE } from '@/data/presets';
import { InvoiceData } from '@/types/invoice';
import { FileText, Eye, Receipt, CreditCard, Plus, Users, Settings } from 'lucide-react';

export default function Home() {
  const [invoice, setInvoice] = useState<InvoiceData>(INITIAL_INVOICE);
  const [activeTab, setActiveTab] = useState<string>('invoice');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helper
  const addToast = (type: 'success' | 'info' | 'error', text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // PDF Export
  const handleDownloadPDF = async () => {
    addToast('info', 'Generating high-resolution PDF...');
    try {
      const cardElement = document.getElementById('invoice-document-card');
      if (!cardElement) {
        window.print();
        return;
      }

      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(cardElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoice.invoiceNumber}_WanderWorld.pdf`);

      addToast('success', 'PDF Invoice downloaded successfully!');
    } catch (err) {
      console.error(err);
      window.print();
    }
  };

  // Share via WhatsApp
  const handleShareWhatsApp = () => {
    const rawTotal = invoice.items.reduce((acc, item) => {
      return acc + (Number(item.price) || 0) * (Number(item.qty) || 1);
    }, 0);
    const netTotal = Math.max(0, rawTotal - (Number(invoice.discount) || 0));

    const message = `*WanderWorld Official Invoice*\nInvoice #: ${invoice.invoiceNumber}\nTraveler: ${invoice.customer.name}\nGSTIN: ${invoice.company.gstin}\nNet Amount: ₹${Math.round(netTotal).toLocaleString('en-IN')}/-\n\nThank you for choosing WanderWorld Holidays!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
    addToast('success', 'Opened WhatsApp invoice summary link!');
  };

  // Save Invoice Action & Celebration
  const handleSave = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FBD813', '#191E28', '#10B981', '#3B82F6'],
      });
    } catch (e) {
      // ignore
    }
    addToast('success', `Invoice ${invoice.invoiceNumber} Issued & Saved!`);
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-[#F6F3EC] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Sidebar Component (Mobile Drawer + Desktop Sidebar) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Right Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F6F3EC] overflow-hidden pb-16 md:pb-0">
        {/* Top Header Component */}
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />

        {/* Main Workspace */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3">
          {activeTab === 'invoice' ? (
            <div className="space-y-3">
              {/* Mobile Switcher (Form vs Live Preview) - Visible on Mobile/Tablet */}
              <div className="lg:hidden flex items-center p-1 bg-white border border-yellow-300/70 rounded-2xl text-xs font-bold w-full shadow-sm no-print">
                <button
                  type="button"
                  onClick={() => setMobileView('form')}
                  className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all font-extrabold ${
                    mobileView === 'form'
                      ? 'bg-[#FACC15] text-black shadow-xs'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>1. Form Input</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMobileView('preview')}
                  className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all font-extrabold ${
                    mobileView === 'preview'
                      ? 'bg-[#FACC15] text-black shadow-xs'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>2. Live A4 Preview</span>
                </button>
              </div>

              {/* Side-by-Side Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Input Form (5 cols) */}
                <div
                  className={`lg:col-span-5 w-full space-y-4 no-print ${
                    mobileView === 'form' ? 'block' : 'hidden lg:block'
                  }`}
                >
                  <InvoiceFormPanel
                    invoice={invoice}
                    setInvoice={setInvoice}
                    onSave={handleSave}
                  />
                </div>

                {/* Right Column: Live Authentic Invoice Preview (7 cols) */}
                <div
                  className={`lg:col-span-7 w-full sticky top-2 ${
                    mobileView === 'preview' ? 'block' : 'hidden lg:block'
                  }`}
                >
                  {/* Mobile Actions Toolbar when in Preview mode */}
                  <div className="lg:hidden flex items-center justify-between p-3 bg-white border border-yellow-200 rounded-2xl mb-3 shadow-xs no-print">
                    <button
                      onClick={() => setMobileView('form')}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-bold rounded-xl flex items-center gap-1"
                    >
                      ← Back to Form
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleDownloadPDF}
                        className="px-3 py-1.5 bg-[#FACC15] hover:bg-yellow-400 text-black text-xs font-extrabold rounded-xl shadow-xs"
                      >
                        ⬇️ PDF
                      </button>
                      <button
                        onClick={handleShareWhatsApp}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-xs"
                      >
                        📲 Share
                      </button>
                    </div>
                  </div>

                  <InvoicePreviewCard invoice={invoice} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 sm:p-8 bg-white rounded-3xl shadow-md border border-yellow-200/50 my-4">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center font-bold text-2xl mb-4">
                {activeTab === 'dashboard'
                  ? '📊'
                  : activeTab === 'wallet'
                  ? '💳'
                  : activeTab === 'services'
                  ? '💼'
                  : activeTab === 'clients'
                  ? '👥'
                  : '⚙️'}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 capitalize">
                {activeTab} Management
              </h2>
              <p className="text-xs text-gray-500 max-w-sm mt-1 mb-6">
                Manage your WanderWorld travel packages, customer ledgers, and billing records.
              </p>
              <button
                onClick={() => setActiveTab('invoice')}
                className="px-5 py-2.5 bg-[#FACC15] hover:bg-yellow-400 text-black font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
              >
                Return to Invoice Generator
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Quick Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161B22]/95 backdrop-blur-md border-t border-[#30363D] px-2 py-1.5 flex items-center justify-around no-print shadow-2xl">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'dashboard'
              ? 'text-[#FBD813]'
              : 'text-[#8B949E] hover:text-white'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Invoices</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'wallet'
              ? 'text-[#FBD813]'
              : 'text-[#8B949E] hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Ledger</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('invoice');
            setMobileView('form');
          }}
          className="flex items-center justify-center -mt-4 w-12 h-12 rounded-full shadow-lg border-2 border-[#161B22] transition-transform active:scale-95 bg-[#FBD813] text-black font-black"
          title="Create Invoice"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>

        <button
          onClick={() => setActiveTab('clients')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'clients'
              ? 'text-[#FBD813]'
              : 'text-[#8B949E] hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Khata</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'settings'
              ? 'text-[#FBD813]'
              : 'text-[#8B949E] hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </nav>

      {/* Toast Feedback Messages */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
