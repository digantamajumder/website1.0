import { CartItem, QuotationForm } from '../types';

export const generateEmailContent = (items: CartItem[], formData: QuotationForm) => {
  const itemsList = items.map(item => 
    `• ${item.name} - Quantity: ${item.quantity}`
  ).join('\n');

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const subject = `ZoomKart Quotation Request - ${formData.name}`;
  
  const body = `Dear ZoomKart Team,

I would like to request a quotation for the following items:

CUSTOMER DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
City: ${formData.city}
Pincode: ${formData.pincode}

ORDER DETAILS:
${itemsList}

Total Items: ${totalQuantity}

Please provide me with the pricing and delivery details for the above items.

Thank you for your quick service!

Best regards,
${formData.name}`;

  return { subject, body };
};

export const openGmailCompose = (to: string, subject: string, body: string) => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, '_blank');
};