import React from 'react';
import { categories } from '../data/categories';
import { Category } from '../types';

interface CategorySliderProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export default function CategorySlider({ selectedCategory, onCategorySelect }: CategorySliderProps) {
  return (
    <div className="bg-white py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => onCategorySelect(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          {categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.name)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}