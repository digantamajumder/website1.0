import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import NoticeBanner from './components/NoticeBanner';
import CategorySlider from './components/CategorySlider';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import QuotationForm from './components/QuotationForm';
import { products } from './data/products';
import { Product, CartItem, QuotationForm as QuotationFormType } from './types';
import { Clock, Zap, Shield, Truck } from 'lucide-react';
import { generateEmailContent, openGmailCompose } from './utils/emailUtils';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuotationFormOpen, setIsQuotationFormOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleQuotationSubmit = (formData: QuotationFormType) => {
    const { subject, body } = generateEmailContent(cartItems, formData);
    openGmailCompose('sellerdemoacc@gmail.com', subject, body);
    setIsQuotationFormOpen(false);
    setIsCartOpen(false);
    // Clear cart after sending quotation
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      
      <NoticeBanner />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Groceries & more delivered in 10 minutes
            </h1>
            <p className="text-lg sm:text-xl text-yellow-800 mb-6">
              Your one-stop shop for everything you need
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-black/20 p-3 rounded-full">
                  <Clock size={24} />
                </div>
                <div className="text-sm font-medium">10 min delivery</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-black/20 p-3 rounded-full">
                  <Zap size={24} />
                </div>
                <div className="text-sm font-medium">24/7 service</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-black/20 p-3 rounded-full">
                  <Shield size={24} />
                </div>
                <div className="text-sm font-medium">Best quality</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-black/20 p-3 rounded-full">
                  <Truck size={24} />
                </div>
                <div className="text-sm font-medium">Get instant quotes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategorySlider
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedCategory ? selectedCategory : 'All Products'}
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <ProductGrid
          products={filteredProducts}
          onAddToCart={addToCart}
        />
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onGetQuotation={() => setIsQuotationFormOpen(true)}
      />

      <QuotationForm
        isOpen={isQuotationFormOpen}
        onClose={() => setIsQuotationFormOpen(false)}
        onSubmit={handleQuotationSubmit}
      />
    </div>
  );
}

export default App;