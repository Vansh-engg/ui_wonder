'use client';

import React from 'react';
import { InvoiceData } from '@/types/invoice';
import InvoicePreviewCard from './InvoicePreviewCard';

interface InvoiceEditorProps {
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

export default function InvoiceEditor({ invoice }: InvoiceEditorProps) {
  return <InvoicePreviewCard invoice={invoice} />;
}
