import React from 'react';
import { X, Minus, Plus, Clock } from 'lucide-react';
import { CartItem, QuotationForm } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onGetQuotation: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onGetQuotation }: CartProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Quote Items ({items.length})</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Service Info */}
          <div className="p-4 bg-green-50 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-sm mt-1">
              <Clock size={16} className="text-yellow-600" />
              <span className="font-medium text-yellow-600">Quick quotation & fast delivery</span>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L13 10.414V17a1 1 0 01-.447.894l-2 1A1 1 0 0110 18v-7.586L6.293 6.707A1 1 0 016 6V4z" />
                  </svg>
                </div>
                <p className="text-gray-500">No items for quotation</p>
                <p className="text-sm text-gray-400 mt-1">Add products to get a quote!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
                      <p className="text-xs text-yellow-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 hover:bg-red-100 text-red-600 rounded-full transition-colors ml-2"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Get Quotation */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Total items: {items.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
                <p className="text-xs text-gray-500">
                  Fill out the form to get personalized pricing and place your order
                </p>
              </div>
              <button 
                onClick={onGetQuotation}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl font-medium transition-colors"
              >
                Get Quotation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}