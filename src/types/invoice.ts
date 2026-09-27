export interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  price: number; // Unit price in ₹
}

export interface CustomerDetails {
  name: string;
  phone: string;
  organization: string;
  city: string;
}

export interface CompanyDetails {
  name: string;
  gstin: string;
  address: string;
  phones: string;
  email: string;
}

export type InvoiceStatus = 'Paid' | 'Pending' | 'Deposit' | 'Overdue';

export interface InvoiceData {
  invoiceNumber: string;
  dateIssued: string;
  status: InvoiceStatus;
  tourName: string;
  paymentStage: string;
  company: CompanyDetails;
  customer: CustomerDetails;
  items: InvoiceItem[];
  discount: number;
  amountPaid: number;
  paymentMethod: string;
  utrNumber: string;
  notes: string;
}
