import React from 'react';
import { Plus, Clock } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1 text-xs">
          <Clock size={12} className="text-yellow-600" />
          <span className="font-medium text-yellow-600">{product.deliveryTime}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-yellow-600 font-medium">
            Get Quote
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg transition-colors group-hover:scale-105 text-sm font-medium"
          >
            Add to Quote
          </button>
        </div>
      </div>
    </div>
  );
}