import React from 'react';
import { Mail, Printer } from 'lucide-react';

export default function NoticeBanner() {
  const handlePrintStoreClick = () => {
    const subject = 'Print Store Request - Document Printing';
    const body = `Dear ZoomKart Team,

I would like to use your print store service. Please find the documents I need to print attached to this email.

PRINTING REQUIREMENTS:
- Document type: [Please specify - A4, A3, Color/Black & White, etc.]
- Number of copies: [Please specify]
- Paper quality: [Please specify if any preference]
- Delivery address: [Please provide your address]
- Phone number: [Please provide your contact number]

Please let me know the pricing and delivery time for the printing service.

Thank you!

Best regards,
[Your Name]`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('sellerdemoacc@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleCustomOrderClick = () => {
    const subject = 'Custom Order Request - Items Not Listed';
    const body = `Dear ZoomKart Team,

I would like to order the following items that are not available on your website:

ITEMS NEEDED:
- [Please list the items you need]
- [Add more items as needed]

CONTACT DETAILS:
Phone Number: [Please provide your phone number]
Delivery Address: [Please provide your address]

Please let me know the availability and pricing for these items.

Thank you!

Best regards,
[Your Name]`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('sellerdemoacc@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 space-y-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600 font-medium">📍 Currently only delivering to KIIT Campus</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-yellow-600" />
              <span>
                Can't find what you need? 
                <button 
                  onClick={handleCustomOrderClick}
                  className="text-yellow-600 hover:text-yellow-700 font-medium ml-1 underline"
                >
                  Email us your requirements
                </button>
                {' '}with your phone number
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Separate Print Store Section */}
      <div className="bg-yellow-100 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center">
            <button
              onClick={handlePrintStoreClick}
              className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Printer size={16} />
              <span>Print Store - Upload Documents to Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}