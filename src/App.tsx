/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Account } from './pages/Account';
import { Dashboard } from './components/Dashboard';
import { Checkout } from './pages/Checkout';
import { CartDrawer } from './components/CartDrawer';
import { GlobalHeader } from './components/GlobalHeader';

import { ContentPage } from './pages/generic/ContentPage';
import { SymptomChecker } from './pages/SymptomChecker';
import { About } from './pages/About';
import { Manufacturing } from './pages/Manufacturing';
import { Wholesale } from './pages/Wholesale';
import { Admin } from './pages/Admin';
import { useEffect } from 'react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartDrawer />
      <Routes>
        {/* PUBLIC LAYER */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:slug" element={<ProductDetail />} />
        
        {/* Health Library */}
        <Route path="/health-library/symptom-checker" element={<SymptomChecker />} />

        {/* IDENTITY LAYER */}
        <Route path="/auth/shopper-id" element={<Account />} />

        {/* SECURE LAYER */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Fallback */}
        <Route path="/*" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
