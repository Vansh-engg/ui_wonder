import { InvoiceData } from '@/types/invoice';

export const INITIAL_INVOICE: InvoiceData = {
  invoiceNumber: 'INV-0155-A',
  dateIssued: '10/07/2026',
  status: 'Paid',
  tourName: 'Spiti Valley High Altitude Expedition',
  paymentStage: 'Booking Deposit',
  company: {
    name: 'WANDERWORLD HOLIDAYS',
    gstin: '27GDXPS7564H1ZD',
    address: '(Flat No. 501, Plot No. 8 & 9, Aakash CHS, Sector 42, Sector 42, Nerul West, Navi Mumbai, Thane, Maharashtra, 400706)',
    phones: '+91 889-825-5104 | +91 932-410-2323',
    email: 'wanderworldandco@gmail.com',
  },
  customer: {
    name: 'Tanmay M',
    phone: '9876543210',
    organization: 'Mumbai Student Travel Group',
    city: 'Mumbai',
  },
  items: [
    {
      id: '1',
      description: 'Spiti Trip (5D4N Deluxe Camping & Vehicle)',
      qty: 1,
      price: 91428.57,
    },
  ],
  discount: 0,
  amountPaid: 96000,
  paymentMethod: 'Google Pay / PhonePe / Paytm UPI',
  utrNumber: '426189201001',
  notes: 'Booking advance received. All Payments in INR.',
};
